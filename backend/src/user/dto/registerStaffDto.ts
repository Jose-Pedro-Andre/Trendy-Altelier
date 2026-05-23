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
import { ApiProperty } from '@nestjs/swagger';

export class RegisterStaffDto {
    @ApiProperty({
        description: 'Staff username',
        example: 'staff_123',
    })
    @IsNotEmpty()
    @IsString()
    username: string;

    @ApiProperty({
        description: 'Staff email address',
        example: 'staff@example.com',
    })
    @IsNotEmpty()
    @IsEmail()
    email: string;

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
        description: 'Staff full name',
        example: 'Jane Smith',
    })
    @IsNotEmpty()
    @IsString()
    fullName: string;

    @ApiProperty({
        description: 'Staff phone number',
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
        description: 'Staff role',
        enum: [Role.CEO, Role.SECRETARY, Role.PRODUCTION_MANAGER],
        example: Role.PRODUCTION_MANAGER,
    })
    @IsEnum(Role)
    @IsIn([Role.CEO, Role.SECRETARY, Role.PRODUCTION_MANAGER])
    role: Role;

    @ApiProperty({
        description: 'Staff job title',
        example: 'Manager',
    })
    @IsNotEmpty()
    @IsString()
    jobTitle: string;

    @ApiProperty({
        description: 'Hire date',
        example: '2026-01-15',
        required: false,
    })
    @IsOptional()
    @Type(() => Date)
    @IsDate()
    hireDate?: Date;

    @ApiProperty({
        description: 'Whether the staff member is active',
        example: true,
        required: false,
    })
    @IsOptional()
    @IsBoolean()
    isActive?: boolean;
}