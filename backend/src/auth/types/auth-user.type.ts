import { Role } from '@prisma/client';

export type AuthUser = {
  id: string;
  username: string;
  email: string | null;
  role: Role;
  fullName: string;
  phoneNumber: string;
};
