import {IsString, IsEmail, IsNotEmpty} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class AuthCredentialsDto {
    @ApiProperty({
        description: 'User identifier (username or email)',
        example: 'user@example.com',
    })
    @IsString()
    @IsNotEmpty()
    identifier: string;

    @ApiProperty({
        description: 'User password',
        example: 'password123',
    })
    @IsString()
    @IsNotEmpty()
    password: string;
}