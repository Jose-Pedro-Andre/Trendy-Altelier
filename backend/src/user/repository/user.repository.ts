import { Injectable } from '@nestjs/common';
import { Prisma, Role } from '@prisma/client';
import * as argon from 'argon2';
import { PrismaService } from 'src/prisma/prisma.service';
import { RegisterCustomerDto } from '../dto/registerCostumer.dto';
import { RegisterStaffDto } from '../dto/registerStaffDto';

@Injectable()
export class UserRepository {
    constructor(private prisma: PrismaService) {}

    async registerStaff(dto: RegisterStaffDto) {
        const hashPassword = await argon.hash(dto.password);

        const staff = await this.prisma.employee.create({
            data: {
                jobTitle: dto.jobTitle,
                hireDate: dto.hireDate,
                isActive: dto.isActive,
                user: {
                    create: {
                        username: dto.username,
                        email: dto.email,
                        password: hashPassword,
                        fullName: dto.fullName,
                        phoneNumber: dto.phoneNumber,
                        role: dto.role,
                    },
                },
            },
            include: {
                user: true,
            },
        });

        if (dto.phoneParents) {
            await this.prisma.$executeRaw(
                Prisma.sql`UPDATE "User" SET "PhoneParents" = ${dto.phoneParents} WHERE "id" = ${staff.userId}`,
            );
        }

        return staff;
    }

    async registerCustomer(dto: RegisterCustomerDto) {
        const hashPassword = await argon.hash(dto.password);

        const customer = await this.prisma.customer.create({
            data: {
                address: dto.address,
                bodyMeasurements: dto.bodyMeasurements as Prisma.InputJsonValue | undefined,
                user: {
                    create: {
                        fullName: dto.fullName,
                        username: dto.username,
                        email: dto.email,
                        password: hashPassword,
                        phoneNumber: dto.phoneNumber,
                        role: Role.CUSTOMER,
                    },
                },
            },
            include: {
                user: true,
            },
        });

        if (dto.phoneParents) {
            await this.prisma.$executeRaw(
                Prisma.sql`UPDATE "User" SET "PhoneParents" = ${dto.phoneParents} WHERE "id" = ${customer.userId}`,
            );
        }
        return customer;
    }

    async registerCostumer(dto: RegisterCustomerDto) {
        return this.registerCustomer(dto);
    }

    async findAllUsers() {
        return this.prisma.user.findMany({
            include: {
                employeeProfile: true,
                customerProfile: true,
            },
            orderBy: {
                createdAt: 'desc',
            },
        });
    }

    async findUserById(userId: string) {
        return this.prisma.user.findUnique({
            where: { id: userId },
            include: {
                employeeProfile: true,
                customerProfile: {
                    include: {
                        orders: {
                            include: {
                                items: true,
                            },
                        },
                    },
                },
            },
        });
    }

    async findUserByIdentifier(identifier: string) {
        return this.prisma.user.findFirst({
            where: {
                OR: [{ username: identifier }, { email: identifier }],
            },
            include: { employeeProfile: true, customerProfile: true },
        });
    }

    async checkUserExists(username: string, email?: string, phoneNumber?: string) {
        const existingUser = await this.prisma.user.findFirst({
            where: {
                OR: [
                    { username },
                    ...(email ? [{ email }] : []),
                    ...(phoneNumber ? [{ phoneNumber }] : []),
                ],
            },
        });

        if (!existingUser) {
            return;
        }

        if (existingUser.username === username) {
            throw new Error('Username already exists');
        }
        if (email && existingUser.email === email) {
            throw new Error('Email already exists');
        }
        if (phoneNumber && existingUser.phoneNumber === phoneNumber) {
            throw new Error('Phone number already exists');
        }
    }
}