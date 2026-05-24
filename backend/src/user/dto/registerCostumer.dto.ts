import { Type } from 'class-transformer';
import {
    IsEmail,
    IsNotEmpty,
    IsObject,
    IsOptional,
    IsString,
    MinLength,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class RegisterCustomerDto {
    @ApiProperty({
        description: 'Customer username',
        example: 'customer_123',
    })
    @IsNotEmpty()
    @IsString()
    username: string;

    @ApiProperty({
        description: 'Customer email address',
        example: 'customer@example.com',
        required: false,
    })
    @IsOptional()
    @IsEmail()
    email?: string;

    @ApiProperty({
        description: 'Password (minimum 6 characters)',
        example: 'password123',
        minLength: 6,
    })
    @IsNotEmpty()
    @IsString()
    @MinLength(6)
    password: string;

    @ApiProperty({
        description: 'Customer full name',
        example: 'John Doe',
    })
    @IsNotEmpty()
    @IsString()
    fullName: string;

    @ApiProperty({
        description: 'Customer phone number',
        example: '+55 11 999999999',
    })
    @IsNotEmpty()
    @IsString()
    phoneNumber: string;

    @ApiProperty({
        description: 'Parent phone number',
        example: '+55 11 999999998',
        required: false,
    })
    @IsOptional()
    @IsString()
    phoneParents?: string;

    @ApiProperty({
        description: 'Customer address',
        example: '123 Main St, City, Country',
        required: false,
    })
    @IsOptional()
    @IsString()
    address?: string;

    @ApiProperty({
        description: 'Body measurements object',
        example: { chest: 90, waist: 75, hip: 95 },
        required: false,
    })
    @IsOptional()
    @Type(() => Object)
    @IsObject()
    bodyMeasurements?: Record<string, unknown>;
}

export { RegisterCustomerDto as RegisterCostumerDto };