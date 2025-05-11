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

        const hashedPassword = HashService.hashPassword(password);

        const newUser: InstanceType<typeof User> = new User({ username, email, password: hashedPassword });
        await newUser.save();

        // Generate a token for the new user
        const tokenPayload = {
            userId: (newUser._id as string).toString(),
            email: newUser.email,
            roles: ["user"], // Default role
        };
        const token = TokenService.generateToken(tokenPayload);

        res.status(201).json({ sucess: true, token, message: "User registered successfully" });
    } catch (error) {
        console.error("Registration error:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}