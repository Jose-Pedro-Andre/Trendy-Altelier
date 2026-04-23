import { Injectable } from '@nestjs/common';
import { AuthRepository } from './repository/auth.repository';
import * as argon2 from 'argon2';

@Injectable()
export class AuthService {
    constructor(private authRepository: AuthRepository) {}
    async validateUser(username: string, password: string): Promise<any> {
        try {
            const user = await this.authRepository.findUserByUsername(username);
            const isPasswordValid = user && await argon2.verify(user.password, password);
            if (user && isPasswordValid) {
                const { password, ...result } = user;
                return result;
            }
            return null;
        } catch (error) {
            throw new Error("Error validating user"); 
        }
    }

    async validateUserByEmail(email: string, password: string): Promise<any> {
        try {
            const user = await this.authRepository.finduserByEmail(email);
            const isPasswordValid = user && await argon2.verify(user.password, password);
            if (user && isPasswordValid) {
                const { password, ...result } = user;
                return result;
            }
        } catch (error) {
            throw new Error("Error validating user by email");
        }
        return null;
    }
    
}
