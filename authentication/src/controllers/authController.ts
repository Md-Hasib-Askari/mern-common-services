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
        const token = TokenService.generateToken(tokenPayload);

        res.status(200).json({ sucess: true, token, message: "Login successful" });
    } catch (error) {
        console.error("Login error:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}