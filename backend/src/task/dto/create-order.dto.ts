import { Type } from 'class-transformer';
import {
  IsArray,
  IsDate,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { OrderStatus } from '@prisma/client';
import { CreateOrderItemDto } from './create-order-item.dto';
import { ApiProperty } from '@nestjs/swagger';

export class CreateOrderDto {
  @ApiProperty({
    description: 'Customer ID',
    example: 'cust_123',
  })
  @IsNotEmpty()
  @IsString()
  customerId: string;

  @ApiProperty({
    description: 'Staff ID to assign the order to',
    example: 'staff_123',
    required: false,
  })
  @IsOptional()
  @IsString()
  assignedToId?: string;

  @ApiProperty({
    description: 'Order deadline',
    example: '2026-06-15',
  })
  @Type(() => Date)
  @IsDate()
  deadline: Date;

  @ApiProperty({
    description: 'Order status',
    enum: OrderStatus,
    example: OrderStatus.PENDING,
    required: false,
  })
  @IsOptional()
  @IsEnum(OrderStatus)
  status?: OrderStatus;

  @ApiProperty({
    description: 'Order items',
    type: [CreateOrderItemDto],
  })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateOrderItemDto)
  items: CreateOrderItemDto[];
}
