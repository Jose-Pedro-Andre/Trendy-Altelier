import { PrismaService } from "src/prisma/prisma.service";
import { User } from "@prisma/client";
import { Injectable } from "@nestjs/common";

@Injectable()
export class AuthRepository {
    constructor(private prisma: PrismaService) {}

    async findUserByUsername(username: string): Promise<User | null> {
        try {
            return this.prisma.user.findUnique({
                where: { username },
            });
        } catch (error) {
            throw new Error("Error finding user by username");
        }
    }

    async finduserByEmail(email: string): Promise<User | null> {
        try {
            return this.prisma.user.findUnique({
                where: { email }
                
            });
        } catch (error) {
            throw new Error("Error finding user by email");
        }
    }
}
