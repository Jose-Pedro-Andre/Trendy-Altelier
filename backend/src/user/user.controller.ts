import { Controller } from '@nestjs/common';
import { RegisterStaffDto } from './dto/registerStaffDto';
import { RegisterCostumerDto } from './dto/registerCostumer.dto';
import { UserRepository } from './repository/user.repository';

@Controller('user')
export class UserController {
    constructor(private userRepository: UserRepository) {}
}
