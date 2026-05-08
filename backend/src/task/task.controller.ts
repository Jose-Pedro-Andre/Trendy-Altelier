import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { TaskService } from './task.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderStatusDto } from './dto/update-order-status.dto';
import { AssignOrderDto } from './dto/assign-order.dto';
import { AddOrderItemDto } from './dto/add-order-item.dto';

@Controller('task')
export class TaskController {
	constructor(private readonly taskService: TaskService) {}

	@Post('orders')
	createOrder(@Body() dto: CreateOrderDto) {
		return this.taskService.createOrder(dto);
	}

	@Get('orders')
	findAllOrders() {
		return this.taskService.findAllOrders();
	}

	@Get('orders/:id')
	findOrderById(@Param('id') id: string) {
		return this.taskService.findOrderById(id);
	}

	@Patch('orders/:id/status')
	updateOrderStatus(@Param('id') id: string, @Body() dto: UpdateOrderStatusDto) {
		return this.taskService.updateOrderStatus(id, dto);
	}

	@Patch('orders/:id/assign')
	assignOrder(@Param('id') id: string, @Body() dto: AssignOrderDto) {
		return this.taskService.assignOrder(id, dto);
	}

	@Post('orders/:id/items')
	addOrderItem(@Param('id') id: string, @Body() dto: AddOrderItemDto) {
		return this.taskService.addOrderItem(id, dto);
	}
}
