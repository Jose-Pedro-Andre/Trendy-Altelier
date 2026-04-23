import { Injectable } from "@nestjs/common";
// import { Repository } from "typeorm";
import { PrismaService } from "src/prisma/prisma.service";
import { RegisterCostumerDto } from "../dto/registerCostumer.dto";
import { RegisterStaffDto } from "../dto/registerStaffDto";
import * as argon from 'argon2';



@Injectable()
export class UserRepository {
    constructor(private prisma: PrismaService) {}
    async registerStaff(dto: RegisterStaffDto)
    {
        
        const hash_password = await argon.hash(dto.password);
        try{
            const staff = await this.prisma.employee.create({
                data: {
                    jobTitle : dto.jobTitle, 
                    hireDate : dto.hireDate,
                    isActive : dto.isActive,
                    user: {
                        create: {
                            username: dto.username,
                            email: dto.email,
                            password: hash_password,
                            fullName: dto.fullName,
                            phoneNumber: dto.phoneNumber,
                            role: dto.role
                        }
                    }
                }
            })
            return staff;
        } catch(error)
        {
            throw new Error("Create staff failed: " + error.message);
        }
    }

    async registerCostumer(dto: RegisterCostumerDto)
    {
        try{
            await this.checkUserExists(dto.username, dto.email);
        } catch(error)
        {
            throw error;
        }
        const hash_password = await argon.hash(dto.password);
        try {

            const costumer = await this.prisma.customer.create({
                data: {
                    isVip: dto.isVip,
                    address: dto.address,
                    user: {
                        create: {
                            fullName: dto.fullName,
                            username: dto.username,
                            password: hash_password,
                            phoneNumber: dto.phoneNumber,
                            role: 'CUSTOMER'
                        }
                    }
                }
            })
            return costumer;

        } catch(error)
        {
            throw new Error("Error in creation custumer: " + error.message);
        }
    }
    async checkUserExists(username: string, email: string = 'email')
    {
        const existingUser = await this.prisma.user.findFirst({
            where:{
                OR: [
                    { username: username },
                    { email: email }
                ]
                
            }
        })
        if (existingUser) {
            if (existingUser.username === username) {
                throw new Error('Username already exists');
            }
            if (existingUser.email === email) {
                throw new Error('Email already exists');
            }
        }
    }
}