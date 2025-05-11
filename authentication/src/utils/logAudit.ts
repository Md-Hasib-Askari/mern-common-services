import AuditLog from '../models/AuditLog';

export const logAudit = async ({
    adminId,
    action,
    target,
    details
}: {
    adminId: string;
    action: string;
    target?: string;
    details?: any;
}) => {
    try {
        await AuditLog.create({
            adminId,
            action,
            target,
            details
        });
    } catch (error) {
        console.error('Failed to log audit:', error);
    }
};
