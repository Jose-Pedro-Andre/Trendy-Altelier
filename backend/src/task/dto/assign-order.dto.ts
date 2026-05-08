import { IsOptional, IsString } from 'class-validator';

export class AssignOrderDto {
  @IsOptional()
  @IsString()
  assignedToId?: string;
}
