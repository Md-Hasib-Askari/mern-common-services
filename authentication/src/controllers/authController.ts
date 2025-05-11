import { Request, Response } from "express";

import { User } from "../models/User";
import { TokenService } from "../services/tokenService";
import { HashService } from "../utils/hash";

export const register = async (req: Request, res: Response): Promise<any> => {
    const { username, email, password } = req.body;

    try {
        // Check if user already exists
        const existingUser = await User.findOne({ username });
        if (existingUser) {
            return res.status(400).json({ message: "Username already exists" });
        }

        // register the new user by hashing the password
        const hashedPassword = HashService.hashPassword(password);
        const newUser: InstanceType<typeof User> = new User({ username, email, password: hashedPassword });
        await newUser.save();

        res.status(201).json({ sucess: true, message: "User registered successfully" });
    } catch (error) {
        console.error("Registration error:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

export const login = async (req: Request, res: Response): Promise<any> => {
    const { email, password } = req.body;

    try {
        // Find the user by username
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ message: "Invalid username or password" });
        }

        // Compare the password with the hashed password
        const isPasswordValid = HashService.comparePassword(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: "Invalid username or password" });
        }

        // Generate a token for the user
        const tokenPayload = {
            userId: (user._id as string).toString(),
            email: user.email,
            roles: ["user"], // Default role
        };
        const accessToken = TokenService.generateAccessToken(tokenPayload);
        const refreshToken = TokenService.generateRefreshToken(tokenPayload);

        user.refreshToken = refreshToken; // Store the refresh token in the database
        await user.save();

        res.status(200).json({ sucess: true, accessToken, refreshToken, message: "Login successful" });
    } catch (error) {
        console.error("Login error:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

export const refreshTokenHandler = async (req: Request, res: Response): Promise<any> => {
    const { refreshToken } = req.body;

    if (!refreshToken) {
        return res.status(401).json({ message: "Refresh token is missing" });
    }

    try {
        // Verify the refresh token
        const decoded = TokenService.verifyToken(refreshToken);
        if (!decoded) {
            return res.status(403).json({ message: "Invalid or expired refresh token" });
        }

        // Find the user by ID and check the stored refresh token
        const user = await User.findById(decoded.userId);
        if (!user || user.refreshToken !== refreshToken) {
            return res.status(403).json({ message: "Invalid or expired refresh token" });
        }

        const tokenPayload = {
            userId: decoded.userId,
            email: decoded.email,
            roles: decoded.roles
        };

        // Generate new access and refresh tokens
        const newAccessToken = TokenService.generateAccessToken(tokenPayload);
        const newRefreshToken = TokenService.generateRefreshToken(tokenPayload);

        // Update the user's refresh token in the database
        user.refreshToken = newRefreshToken;
        await user.save();

        res.status(200).json({ sucess: true, accessToken: newAccessToken, refreshToken: newRefreshToken, message: "Tokens refreshed successfully" });
    } catch (error) {
        console.error("Refresh token error:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

export const logout = async (req: Request, res: Response): Promise<any> => {
    let userObj = req.headers["user"] as string;
    if (!userObj) {
        return res.status(401).json({ message: "User information is missing" });
    }
    const { userId, email } = JSON.parse(userObj) as { userId: string; email: string };

    try {
        // Find the user by refresh token and remove it
        const user = await User.findOneAndUpdate({ _id: userId }, { refreshToken: null });
        if (!user) {
            return res.status(403).json({ message: "Invalid or expired refresh token" });
        }

        res.status(200).json({ sucess: true, message: "Logged out successfully" });
    } catch (error) {
        console.error("Logout error:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}