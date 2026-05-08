import { Type } from 'class-transformer';
import {
    IsEmail,
    IsNotEmpty,
    IsObject,
    IsOptional,
    IsString,
    MinLength,
} from 'class-validator';

export class RegisterCustomerDto {
    @IsNotEmpty()
    @IsString()
    username: string;

    @IsOptional()
    @IsEmail()
    email?: string;

    @IsNotEmpty()
    @IsString()
    @MinLength(6)
    password: string;

    @IsNotEmpty()
    @IsString()
    fullName: string;

    @IsNotEmpty()
    @IsString()
    phoneNumber: string;

    @IsOptional()
    @IsString()
    phoneParents?: string;

    @IsOptional()
    @IsString()
    address?: string;

    @IsOptional()
    @Type(() => Object)
    @IsObject()
    bodyMeasurements?: Record<string, unknown>;
}

export { RegisterCustomerDto as RegisterCostumerDto };