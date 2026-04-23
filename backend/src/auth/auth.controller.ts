import { Controller } from '@nestjs/common';
import { AuthService } from './auth.service';
// import { AuthRepository } from './repository/auth.repository';
import { Get, Post, Body } from '@nestjs/common';
import { AuthCredentialsDto } from './dto/auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  async login(@Body() credentials: AuthCredentialsDto) {
    return this.authService.validateUser(credentials.identifier, credentials.password);
  }


}
