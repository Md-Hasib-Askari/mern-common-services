import mongoose, { Document } from 'mongoose';

// Define the User interface
interface User extends Document {
    email: string;
    password: string;
    resetToken?: string;
    resetTokenExpiry?: Date;
}

const userSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    resetToken: String,
    resetTokenExpiry: Date
}, { timestamps: true });

export const User = mongoose.model('User', userSchema);
