import { Injectable } from '@nestjs/common';
import { UserRepository } from './repository/user.repository';
import { RegisterStaffDto } from './dto/registerStaffDto';
import { RegisterCostumerDto } from './dto/registerCostumer.dto';

@Injectable()
export class UserService {
    constructor(private repository: UserRepository) {}

    async registerStaff(dto: RegisterStaffDto) {
        try{
            const staff = await this.repository.registerStaff(dto);
            return staff;
        }catch(error)
        {
            throw new Error("Register staff failed: " + error.message);
        }
    }

    async registerCostumer(dto: RegisterCostumerDto) {
        try{
            const costumer = await this.repository.registerCostumer(dto);
            return costumer;
        } catch(error)
        {
            throw new Error("Register costumer failed: " + error.message);
        }
    }
}
