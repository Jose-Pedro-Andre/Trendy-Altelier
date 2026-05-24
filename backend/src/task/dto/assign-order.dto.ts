import { IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class AssignOrderDto {
  @ApiProperty({
    description: 'Staff ID to assign the order to',
    example: 'staff_123',
    required: false,
  })
  @IsOptional()
  @IsString()
  assignedToId?: string;
}
