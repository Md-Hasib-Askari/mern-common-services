import mongoose, { Document } from 'mongoose';

interface IUserRole extends Document {
    userId: mongoose.Schema.Types.ObjectId;
    role: string; // Role ID or name
}

const UserRoleSchema = new mongoose.Schema<IUserRole>({
    userId: { type: mongoose.Schema.Types.ObjectId, required: true },
    role: { type: String, required: true },
});

export const UserRole = mongoose.model('UserRole', UserRoleSchema);