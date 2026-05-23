import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { TaskService } from './task.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderStatusDto } from './dto/update-order-status.dto';
import { AssignOrderDto } from './dto/assign-order.dto';
import { AddOrderItemDto } from './dto/add-order-item.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiBody, ApiParam } from '@nestjs/swagger';

@ApiTags('Orders')
@Controller('task')
export class TaskController {
	constructor(private readonly taskService: TaskService) {}

	@Post('orders')
	@ApiOperation({
		summary: 'Create a new order',
		description: 'Create a new order with items for a customer',
	})
	@ApiBody({
		type: CreateOrderDto,
		description: 'Order details with items',
	})
	@ApiResponse({
		status: 201,
		description: 'Order created successfully',
		schema: {
			example: {
				id: 'order_123',
				customerId: 'cust_123',
				deadline: '2026-06-15T00:00:00Z',
				status: 'PENDING',
				items: [
					{
						id: 'item_123',
						description: 'Blue shirt',
						quantity: 5,
						unitPrice: 29.99,
					},
				],
			},
		},
	})
	@ApiResponse({
		status: 400,
		description: 'Invalid order data',
	})
	createOrder(@Body() dto: CreateOrderDto) {
		return this.taskService.createOrder(dto);
	}

	@Get('orders')
	@ApiOperation({
		summary: 'List all orders',
		description: 'Retrieve a list of all orders',
	})
	@ApiResponse({
		status: 200,
		description: 'List of orders retrieved successfully',
		schema: {
			example: [
				{
					id: 'order_123',
					customerId: 'cust_123',
					status: 'PENDING',
					deadline: '2026-06-15T00:00:00Z',
				},
			],
		},
	})
	findAllOrders() {
		return this.taskService.findAllOrders();
	}

	@Get('orders/:id')
	@ApiOperation({
		summary: 'Get order by ID',
		description: 'Retrieve a specific order with all its details and items',
	})
	@ApiParam({
		name: 'id',
		description: 'Order ID',
		example: 'order_123',
	})
	@ApiResponse({
		status: 200,
		description: 'Order retrieved successfully',
		schema: {
			example: {
				id: 'order_123',
				customerId: 'cust_123',
				assignedToId: 'staff_123',
				deadline: '2026-06-15T00:00:00Z',
				status: 'IN_PROGRESS',
				items: [
					{
						id: 'item_123',
						description: 'Blue shirt',
						quantity: 5,
						unitPrice: 29.99,
					},
				],
			},
		},
	})
	@ApiResponse({
		status: 404,
		description: 'Order not found',
	})
	findOrderById(@Param('id') id: string) {
		return this.taskService.findOrderById(id);
	}

	@Patch('orders/:id/status')
	@ApiOperation({
		summary: 'Update order status',
		description: 'Update the status of an existing order',
	})
	@ApiParam({
		name: 'id',
		description: 'Order ID',
		example: 'order_123',
	})
	@ApiBody({
		type: UpdateOrderStatusDto,
		description: 'New order status',
	})
	@ApiResponse({
		status: 200,
		description: 'Order status updated successfully',
		schema: {
			example: {
				id: 'order_123',
				customerId: 'cust_123',
				status: 'FINISHED',
			},
		},
	})
	@ApiResponse({
		status: 404,
		description: 'Order not found',
	})
	updateOrderStatus(@Param('id') id: string, @Body() dto: UpdateOrderStatusDto) {
		return this.taskService.updateOrderStatus(id, dto);
	}

	@Patch('orders/:id/assign')
	@ApiOperation({
		summary: 'Assign order to staff',
		description: 'Assign or reassign an order to a staff member',
	})
	@ApiParam({
		name: 'id',
		description: 'Order ID',
		example: 'order_123',
	})
	@ApiBody({
		type: AssignOrderDto,
		description: 'Staff ID to assign to',
	})
	@ApiResponse({
		status: 200,
		description: 'Order assigned successfully',
		schema: {
			example: {
				id: 'order_123',
				customerId: 'cust_123',
				assignedToId: 'staff_123',
				status: 'ASSIGNED',
			},
		},
	})
	@ApiResponse({
		status: 404,
		description: 'Order not found',
	})
	assignOrder(@Param('id') id: string, @Body() dto: AssignOrderDto) {
		return this.taskService.assignOrder(id, dto);
	}

	@Post('orders/:id/items')
	@ApiOperation({
		summary: 'Add item to order',
		description: 'Add a new item to an existing order',
	})
	@ApiParam({
		name: 'id',
		description: 'Order ID',
		example: 'order_123',
	})
	@ApiBody({
		type: AddOrderItemDto,
		description: 'Item details to add',
	})
	@ApiResponse({
		status: 201,
		description: 'Item added to order successfully',
		schema: {
			example: {
				id: 'order_123',
				items: [
					{
						id: 'item_123',
						description: 'Blue shirt',
						quantity: 5,
						unitPrice: 29.99,
					},
					{
						id: 'item_124',
						description: 'Red tie',
						quantity: 2,
						unitPrice: 15.99,
					},
				],
			},
		},
	})
	@ApiResponse({
		status: 404,
		description: 'Order not found',
	})
	addOrderItem(@Param('id') id: string, @Body() dto: AddOrderItemDto) {
		return this.taskService.addOrderItem(id, dto);
	}
}
