import { Injectable } from '@nestjs/common';
import * as argon from 'argon2';
import { JwtService } from '@nestjs/jwt';
import { UserRepository } from 'src/user/repository/user.repository';
import { AuthUser } from './types/auth-user.type';

@Injectable()
export class AuthService {
    constructor(
        private readonly userRepository: UserRepository,
        private readonly jwtService: JwtService,
    ) {}

    async validateUser(identifier: string, password: string): Promise<AuthUser | null> {
        const user = await this.userRepository.findUserByIdentifier(identifier);

        if (!user) {
            return null;
        }
        const isValidPassword = await argon.verify(user.password, password);
        if (!isValidPassword) {
            return null;
        }
        return {
            id: user.id,
            username: user.username,
            email: user.email,
            role: user.role,
            fullName: user.fullName,
            phoneNumber: user.phoneNumber,
        };
    }
    async login(user: AuthUser) {
        const payload = {
            sub: user.id,
            username: user.username,
            role: user.role,
            email: user.email,
        };

        return {
            accessToken: await this.jwtService.signAsync(payload),
            user,
        };
    }
}
