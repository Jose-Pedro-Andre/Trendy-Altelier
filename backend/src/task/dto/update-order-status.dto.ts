import { OrderStatus } from '@prisma/client';
import { IsEnum } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateOrderStatusDto {
  @ApiProperty({
    description: 'New order status',
    enum: OrderStatus,
    example: OrderStatus.FINISHED,
  })
  @IsEnum(OrderStatus)
  status: OrderStatus;
}
