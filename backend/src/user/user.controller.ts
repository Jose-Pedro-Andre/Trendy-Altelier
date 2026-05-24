import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { RegisterStaffDto } from './dto/registerStaffDto';
import { RegisterCustomerDto } from './dto/registerCostumer.dto';
import { UserService } from './user.service';
import { ApiTags, ApiOperation, ApiResponse, ApiBody, ApiParam } from '@nestjs/swagger';

@ApiTags('Users')
@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Post('staff')
    @ApiOperation({
        summary: 'Register staff member',
        description: 'Create a new staff member account (CEO, Secretary, or Production Manager)',
    })
    @ApiBody({
        type: RegisterStaffDto,
        description: 'Staff registration details',
    })
    @ApiResponse({
        status: 201,
        description: 'Staff member registered successfully',
        schema: {
            example: {
                id: 'staff_123',
                username: 'staff_user',
                email: 'staff@example.com',
                fullName: 'Jane Smith',
                role: 'PRODUCTION_MANAGER',
            },
        },
    })
    @ApiResponse({
        status: 400,
        description: 'Invalid input data',
    })
    registerStaff(@Body() dto: RegisterStaffDto) {
        return this.userService.registerStaff(dto);
    }

    @Post('customer')
    @ApiOperation({
        summary: 'Register customer',
        description: 'Create a new customer account',
    })
    @ApiBody({
        type: RegisterCustomerDto,
        description: 'Customer registration details',
    })
    @ApiResponse({
        status: 201,
        description: 'Customer registered successfully',
        schema: {
            example: {
                id: 'cust_123',
                username: 'customer_user',
                email: 'customer@example.com',
                fullName: 'John Doe',
                phoneNumber: '+55 11 999999999',
            },
        },
    })
    @ApiResponse({
        status: 400,
        description: 'Invalid input data',
    })
    registerCustomer(@Body() dto: RegisterCustomerDto) {
        return this.userService.registerCustomer(dto);
    }

    @Get()
    @ApiOperation({
        summary: 'List all users',
        description: 'Retrieve a list of all registered users',
    })
    @ApiResponse({
        status: 200,
        description: 'List of users retrieved successfully',
        schema: {
            example: [
                {
                    id: 'user_123',
                    username: 'user1',
                    email: 'user1@example.com',
                    fullName: 'User One',
                },
            ],
        },
    })
    findAllUsers() {
        return this.userService.findAllUsers();
    }

    @Get(':id')
    @ApiOperation({
        summary: 'Get user by ID',
        description: 'Retrieve a specific user by their ID',
    })
    @ApiParam({
        name: 'id',
        description: 'User ID',
        example: 'user_123',
    })
    @ApiResponse({
        status: 200,
        description: 'User retrieved successfully',
        schema: {
            example: {
                id: 'user_123',
                username: 'john_doe',
                email: 'john@example.com',
                fullName: 'John Doe',
            },
        },
    })
    @ApiResponse({
        status: 404,
        description: 'User not found',
    })
    findUserById(@Param('id') id: string) {
        return this.userService.findUserById(id);
    }
}
