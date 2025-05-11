import jwt from 'jsonwebtoken';

import { TokenPayload } from '../types/tokenPayload';
import { JWT_SECRET, ACCESS_TOKEN_EXPIRY, REFRESH_TOKEN_EXPIRY } from '../config/config';

export class TokenService {
    static generateAccessToken(payload: TokenPayload): string {
        return jwt.sign(payload, JWT_SECRET, { expiresIn: ACCESS_TOKEN_EXPIRY as jwt.SignOptions['expiresIn'] });
    }

    static generateRefreshToken(payload: TokenPayload): string {
        return jwt.sign(payload, JWT_SECRET, { expiresIn: REFRESH_TOKEN_EXPIRY as jwt.SignOptions['expiresIn'] });
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