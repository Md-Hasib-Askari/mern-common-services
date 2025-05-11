import mongoose, { Document } from 'mongoose';

interface IRole extends Document {
    name: string;
    permissions: string[]; // Array of permission IDs or names
}

const RoleSchema = new mongoose.Schema<IRole>({
    name: { type: String, required: true, unique: true },
    permissions: [{ type: String, required: true }],
});

export const Role = mongoose.model('Role', RoleSchema);