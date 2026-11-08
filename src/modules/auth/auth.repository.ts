// modules/auth/auth.repository.ts — In-memory & DB-backed user repository

import type { User } from './auth.types.ts';
import { hashPassword } from './auth.utils.ts';

// Initial seeded test users
const usersStore: User[] = [
  {
    id: 'u_customer_demo',
    name: 'Ritesh Kumar',
    email: 'customer@bookmyshow.com',
    passwordHash: hashPassword('password123'),
    phone: '9876543210',
    role: 'CUSTOMER',
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-01'),
  },
  {
    id: 'u_admin_demo',
    name: 'BMS System Admin',
    email: 'admin@bookmyshow.com',
    passwordHash: hashPassword('admin123'),
    role: 'ADMIN',
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-01'),
  },
];

export const authRepository = {
  findByEmail(email: string): User | undefined {
    return usersStore.find((u) => u.email.toLowerCase() === email.toLowerCase());
  },

  findById(id: string): User | undefined {
    return usersStore.find((u) => u.id === id);
  },

  create(user: User): User {
    usersStore.push(user);
    return user;
  },

  count(): number {
    return usersStore.length;
  },
};

