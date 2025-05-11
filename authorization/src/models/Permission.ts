import mongoose, { Document } from 'mongoose';

interface IPermission extends Document {
    name: string;
    description?: string;
}

const PermissionSchema = new mongoose.Schema<IPermission>({
    name: { type: String, required: true, unique: true },
    description: { type: String },
});

export const Permission = mongoose.model('Permission', PermissionSchema);
