import { Request, Response } from 'express';
import crypto from 'crypto';

import { User } from '../models/user';
import { HashService } from '../utils/hash';

// Forgot password
export const forgotPassword = async (req: Request, res: Response): Promise<any> => {
    const { email } = req.body;

    try {
        // Check if the user exists
        const user = await User.findOne({ email });
        if (!user) {
            return res.sendStatus(204); // Don't reveal if the email exists
        }

        // Generate a reset token and expiry date
        const resetToken = crypto.randomBytes(32).toString('hex');
        const resetTokenExpiry = new Date(Date.now() + 3600000); // 1 hour from now

        // Save the reset token and expiry date to the user document
        user.resetToken = resetToken;
        user.resetTokenExpiry = resetTokenExpiry;
        await user.save();

        // TODO: Send the reset token to the user's email (mocked here)
        console.log(`Reset token for ${email}: ${resetToken}`);

        return res.status(200).json({ message: 'Reset token sent to email' });
    } catch (error) {
        return res.status(500).json({ message: 'Server error', error });
    }
};

// Reset password
export const resetPassword = async (req: Request, res: Response): Promise<any> => {
    const { token, newPassword } = req.body;

    try {
        // Find the user with the reset token
        const user = await User.findOne({ resetToken: token, resetTokenExpiry: { $gt: new Date() } });
        if (!user) {
            return res.status(400).json({ message: 'Invalid or expired token' });
        }

        // Update the user's password and clear the reset token
        user.password = HashService.hashPassword(newPassword); // Hash this in a real application
        user.resetToken = undefined;
        user.resetTokenExpiry = undefined;
        await user.save();

        return res.status(200).json({ message: 'Password reset successfully' });
    } catch (error) {
        return res.status(500).json({ message: 'Server error', error });
    }
};