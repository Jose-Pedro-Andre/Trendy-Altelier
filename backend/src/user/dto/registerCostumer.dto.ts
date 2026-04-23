import { Role } from '@prisma/client';
import { Type } from 'class-transformer';
import { IsEnum, IsNotEmpty, IsString, ValidateNested } from 'class-validator'

export enum UserRole {
    USER = 'COSTUMER',
    ADMIN = 'ADMIN',
    PRODUTION_MANAGER = 'PRODUTION_MANAGER',
    CUSTUMER = 'CUSTUMER'
}


export class RegisterCostumerDto {
    address: string;
    isVip: boolean;
    bodyMeasurements: {
        caminsa: JSON,
        calca: JSON
    };
    @IsNotEmpty()
    @IsString()
    username: string;
    @IsNotEmpty()
    @IsString()
    email?: string; 
    @IsNotEmpty()
    @IsString()
    password: string;
    @IsNotEmpty()
    @IsString()
    fullName: string;
    @IsNotEmpty()
    @IsString()
    phoneNumber: string;
    @IsNotEmpty()
    @ValidateNested()
    @IsEnum(Role)
    role: Role;
}