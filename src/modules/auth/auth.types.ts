// modules/auth/auth.types.ts — Authentication domain models & JWT contracts

export type UserRole = 'CUSTOMER' | 'ADMIN' | 'CINEMA_OWNER';

export interface User {
  id: string;
  name: string;
  email: string;
  passwordHash: string;
  phone?: string | undefined;
  role: UserRole;
  createdAt: Date;
  updatedAt: Date;
}

export interface UserSanitized {
  id: string;
  name: string;
  email: string;
  phone?: string | undefined;
  role: UserRole;
  createdAt: Date;
}

export interface JwtPayload {
  userId: string;
  email: string;
  role: UserRole;
  name: string;
}

export interface AuthResponse {
  user: UserSanitized;
  accessToken: string;
  expiresIn: string;
}

