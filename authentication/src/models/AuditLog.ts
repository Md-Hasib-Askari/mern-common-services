import mongoose, { Document } from 'mongoose';

// AuditLog model for logging admin actions
// This model is used to track actions performed by admin users in the system
// It includes fields for the admin ID, action type, log level, target user ID, and details of the action
// The schema is designed to be flexible, allowing for various types of actions and details
// The logLevel field can be used to categorize the severity of the action (e.g., INFO, WARN, ERROR)
// The target field can be used to specify the user or resource that the action was performed on
// The timestamp field records when the action was performed, defaulting to the current date and time

// (Optional) Store IP address and user agent in the details field for better tracking

export interface IAuditLog extends Document {
    adminId: Document['_id']; // reference to the admin user
    action: string;
    logLevel?: string; // optional: e.g., 'info', 'warn', 'error'
    target?: string; // optional: e.g., target user ID
    details?: any;
    timestamp: Date;
}

const AuditLogSchema = new mongoose.Schema<IAuditLog>({
    adminId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    action: { type: String, required: true, enum: ['CREATE_USER', 'DELETE_USER', 'UPDATE_USER', 'LOGIN', 'LOGOUT'] },
    logLevel: { type: String, enum: ['INFO', 'WARN', 'ERROR', 'CRITICAL'], default: 'INFO' },
    target: { type: String },
    details: { type: Object },
    timestamp: { type: Date, default: Date.now }
});

export default mongoose.model<IAuditLog>('AuditLog', AuditLogSchema);
