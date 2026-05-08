import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { UserRepository } from './repository/user.repository';
import { RegisterStaffDto } from './dto/registerStaffDto';
import { RegisterCustomerDto } from './dto/registerCostumer.dto';
import { Role, User } from '@prisma/client';

@Injectable()
export class UserService {
    constructor(private repository: UserRepository) {}

    private sanitizeUser(user: User) {
        const { password, ...safeUser } = user;
        return safeUser;
    }

    async registerStaff(dto: RegisterStaffDto) {
        if (dto.role === Role.CUSTOMER) {
            throw new BadRequestException('Staff users cannot have CUSTOMER role.');
        }

        try {
            await this.repository.checkUserExists(dto.username, dto.email, dto.phoneNumber);
            const staff = await this.repository.registerStaff(dto);
            const user = await this.repository.findUserById(staff.userId);
            return {
                ...staff,
                user: user ? this.sanitizeUser(user) : null,
            };
        } catch (error: unknown) {
            const message = error instanceof Error ? error.message : 'Unknown error';
            throw new BadRequestException(`Register staff failed: ${message}`);
        }
    }

    async registerCustomer(dto: RegisterCustomerDto) {
        try {
            await this.repository.checkUserExists(dto.username, dto.email, dto.phoneNumber);
            const customer = await this.repository.registerCustomer(dto);
            const user = await this.repository.findUserById(customer.userId);
            return {
                ...customer,
                user: user ? this.sanitizeUser(user) : null,
            };
        } catch (error: unknown) {
            const message = error instanceof Error ? error.message : 'Unknown error';
            throw new BadRequestException(`Register customer failed: ${message}`);
        }
    }

    async registerCostumer(dto: RegisterCustomerDto) {
        return this.registerCustomer(dto);
    }

    async findAllUsers() {
        const users = await this.repository.findAllUsers();
        return users.map((user) => this.sanitizeUser(user));
    }

    async findUserById(userId: string) {
        const user = await this.repository.findUserById(userId);

        if (!user) {
            throw new NotFoundException('User not found');
        }

        return this.sanitizeUser(user);
    }
}
