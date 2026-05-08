import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Prisma } from '@prisma/client';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderStatusDto } from './dto/update-order-status.dto';
import { AssignOrderDto } from './dto/assign-order.dto';
import { AddOrderItemDto } from './dto/add-order-item.dto';

@Injectable()
export class TaskService {
	constructor(private readonly prisma: PrismaService) {}

	private toDecimal(value: number) {
		return new Prisma.Decimal(value.toFixed(2));
	}

	private calculateTotal(items: Array<{ quantity: number; unitPrice: number }>) {
		return items.reduce((sum, item) => sum + item.quantity * item.unitPrice, 0);
	}

	private async refreshCustomerVipStatus(customerId: string) {
		const totalOrders = await this.prisma.order.count({ where: { customerId } });
		await this.prisma.customer.update({
			where: { id: customerId },
			data: { isVip: totalOrders >= 3 },
		});
	}

	async createOrder(dto: CreateOrderDto) {
		const customer = await this.prisma.customer.findUnique({ where: { id: dto.customerId } });

		if (!customer) {
			throw new NotFoundException('Customer not found');
		}

		if (dto.assignedToId) {
			const employee = await this.prisma.employee.findUnique({ where: { id: dto.assignedToId } });

			if (!employee) {
				throw new NotFoundException('Employee not found');
			}
		}

		if (!dto.items.length) {
			throw new BadRequestException('Order must have at least one item');
		}

		const totalAmount = this.calculateTotal(dto.items);

		const order = await this.prisma.order.create({
			data: {
				customerId: dto.customerId,
				assignedToId: dto.assignedToId,
				deadline: dto.deadline,
				status: dto.status,
				totalAmount: this.toDecimal(totalAmount),
				items: {
					create: dto.items.map((item) => ({
						description: item.description,
						quantity: item.quantity,
						unitPrice: this.toDecimal(item.unitPrice),
					})),
				},
			},
			include: {
				customer: { include: { user: true } },
				assignedTo: { include: { user: true } },
				items: true,
			},
		});

		await this.refreshCustomerVipStatus(dto.customerId);
		return order;
	}

	findAllOrders() {
		return this.prisma.order.findMany({
			include: {
				customer: { include: { user: true } },
				assignedTo: { include: { user: true } },
				items: true,
			},
			orderBy: { createdAt: 'desc' },
		});
	}

	async findOrderById(orderId: string) {
		const order = await this.prisma.order.findUnique({
			where: { id: orderId },
			include: {
				customer: { include: { user: true } },
				assignedTo: { include: { user: true } },
				items: true,
			},
		});

		if (!order) {
			throw new NotFoundException('Order not found');
		}

		return order;
	}

	async updateOrderStatus(orderId: string, dto: UpdateOrderStatusDto) {
		await this.findOrderById(orderId);

		return this.prisma.order.update({
			where: { id: orderId },
			data: { status: dto.status },
			include: {
				customer: { include: { user: true } },
				assignedTo: { include: { user: true } },
				items: true,
			},
		});
	}

	async assignOrder(orderId: string, dto: AssignOrderDto) {
		await this.findOrderById(orderId);

		if (dto.assignedToId) {
			const employee = await this.prisma.employee.findUnique({ where: { id: dto.assignedToId } });

			if (!employee) {
				throw new NotFoundException('Employee not found');
			}
		}

		return this.prisma.order.update({
			where: { id: orderId },
			data: { assignedToId: dto.assignedToId ?? null },
			include: {
				customer: { include: { user: true } },
				assignedTo: { include: { user: true } },
				items: true,
			},
		});
	}

	async addOrderItem(orderId: string, dto: AddOrderItemDto) {
		const order = await this.findOrderById(orderId);

		await this.prisma.orderItem.create({
			data: {
				orderId,
				description: dto.description,
				quantity: dto.quantity,
				unitPrice: this.toDecimal(dto.unitPrice),
			},
		});

		const updatedTotal = Number(order.totalAmount) + dto.quantity * dto.unitPrice;

		await this.prisma.order.update({
			where: { id: orderId },
			data: { totalAmount: this.toDecimal(updatedTotal) },
		});

		return this.findOrderById(orderId);
	}
}
