import { Controller, Post, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { Request } from 'express';
import { AuthUser } from './types/auth-user.type';
import { ApiTags, ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';
import { LoginDto } from './dto/login.dto';

@ApiTags('Authentication')
@Controller('auth')
export class AuthController {
	constructor(private readonly authService: AuthService) {}

	@UseGuards(LocalAuthGuard)
	@Post('login')
	@ApiOperation({
		summary: 'User login',
		description: 'Authenticate user with credentials and return JWT token',
	})
	@ApiBody({
		type: LoginDto,
		description: 'User login credentials',
	})
	@ApiResponse({
		status: 200,
		description: 'Login successful',
		schema: {
			example: {
				id: 'user_123',
				username: 'john_doe',
				email: 'john@example.com',
				accessToken: 'eyJhbGciOiJIUzI1NiIs...',
			},
		},
	})
	@ApiResponse({
		status: 401,
		description: 'Invalid credentials',
	})
	login(@Req() req: Request & { user: AuthUser }) {
		return this.authService.login(req.user);
	}
}
