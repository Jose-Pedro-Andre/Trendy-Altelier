import { IsString, IsNotEmpty, IsBoolean, ValidateNested, IsEnum } from "class-validator";
import { Role } from "@prisma/client";


export class RegisterStaffDto {
    @IsNotEmpty()
    @IsString()
    userId: string;
    @IsString()
    jobTitle: string;
    @IsString()
    hireDate: Date;
    @IsBoolean()
    isActive: boolean;
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