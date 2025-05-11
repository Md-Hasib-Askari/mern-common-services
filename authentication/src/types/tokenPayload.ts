export interface TokenPayload {
    userId: string;
    email: string;
    roles: string[];
    iat?: number; // Issued at (optional)
    exp?: number; // Expiration time (optional)
}