export const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret";
export const JWT_EXPIRATION = process.env.JWT_EXPIRATION || "1h"; // Default expiration time
export const ACCESS_TOKEN_EXPIRY = process.env.ACCESS_TOKEN_EXPIRY || "15m"; // Default access token expiry time
export const REFRESH_TOKEN_EXPIRY = process.env.REFRESH_TOKEN_EXPIRY || "7d"; // Default refresh token expiry time

export const SALT_ROUNDS = parseInt(process.env.SALT_ROUNDS || "10", 10); // Default salt rounds for bcrypt
export const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost:27017/authentication"; // Default MongoDB URI
export const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 5000; // Default port for the server