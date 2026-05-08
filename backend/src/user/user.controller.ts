import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { RegisterStaffDto } from './dto/registerStaffDto';
import { RegisterCustomerDto } from './dto/registerCostumer.dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Post('staff')
    registerStaff(@Body() dto: RegisterStaffDto) {
        return this.userService.registerStaff(dto);
    }

    @Post('customer')
    registerCustomer(@Body() dto: RegisterCustomerDto) {
        return this.userService.registerCustomer(dto);
    }

    @Get()
    findAllUsers() {
        return this.userService.findAllUsers();
    }

    @Get(':id')
    findUserById(@Param('id') id: string) {
        return this.userService.findUserById(id);
    }
}
