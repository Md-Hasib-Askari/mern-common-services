import { hashSync, compareSync } from 'bcryptjs';

import { SALT_ROUNDS } from '../config/config.js';

export class HashService {
    static hashPassword(password: string): string {
        return hashSync(password, SALT_ROUNDS);
    }

    static comparePassword(password: string, hashedPassword: string): boolean {
        return compareSync(password, hashedPassword);
    }
}