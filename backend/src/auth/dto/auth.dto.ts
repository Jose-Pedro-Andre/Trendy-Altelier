import {IsString, IsEmail, IsNotEmpty} from 'class-validator';

export class AuthCredentialsDto {
    @IsString()
    @IsNotEmpty()
    identifier: string;

    @IsString()
    @IsNotEmpty()
    password: string;
}