import { Role } from '@prisma/client';
import { Type } from 'class-transformer';
import {
    IsBoolean,
    IsDate,
    IsEmail,
    IsEnum,
    IsIn,
    IsNotEmpty,
    IsOptional,
    IsString,
    MinLength,
} from 'class-validator';

export class RegisterStaffDto {
    @IsNotEmpty()
    @IsString()
    username: string;

    @IsNotEmpty()
    @IsEmail()
    email: string;

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

    @IsEnum(Role)
    @IsIn([Role.CEO, Role.SECRETARY, Role.PRODUCTION_MANAGER])
    role: Role;

    @IsNotEmpty()
    @IsString()
    jobTitle: string;

    @IsOptional()
    @Type(() => Date)
    @IsDate()
    hireDate?: Date;

    @IsOptional()
    @IsBoolean()
    isActive?: boolean;
}