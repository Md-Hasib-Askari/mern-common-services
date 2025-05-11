import jwt from 'jsonwebtoken';

import { TokenPayload } from '../types/tokenPayload';
import { JWT_SECRET, JWT_EXPIRATION } from '../config/config';

export class TokenService {
    static generateToken(payload: TokenPayload): string {
        return jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRATION as jwt.SignOptions['expiresIn'] });
    }

    static verifyToken(token: string): TokenPayload | null {
        try {
            const decoded = jwt.verify(token, JWT_SECRET) as TokenPayload;
            return decoded;
        } catch (error) {
            console.error('Token verification failed:', error);
            return null;
        }
    }
}