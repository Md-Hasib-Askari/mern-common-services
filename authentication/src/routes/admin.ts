import { Router, Request, Response } from 'express';
import { authenticateToken } from '../middlewares/authMiddleware';
import { requireRole } from '../middlewares/requireRole';
import { logAudit } from '../utils/logAudit';
import { User } from '../models/User';
import AuditLog from '../models/AuditLog';

const router = Router();

router.get('/dashboard', authenticateToken, requireRole(['admin']), (req: Request, res: Response) => {
    const user = req.headers.user ? JSON.parse(req.headers.user as string) : null;
    res.json({ message: 'This is the admin dashboard', user });
});
router.delete(
    '/delete-user/:id',
    authenticateToken,
    requireRole(['admin']),
    async (req: Request, res: Response) => {
        const userId = req.params.id;
        const adminId = req.headers.user ? JSON.parse(req.headers.user as string).userId : null;

        try {
            await User.findByIdAndDelete(userId);

            await logAudit({
                adminId,
                action: 'DELETE_USER',
                target: userId,
                details: { reason: 'manual deletion' }
            });

            res.json({ message: 'User deleted and action logged' });
        } catch (error) {
            res.status(500).json({ message: 'Failed to delete user' });
        }
    }
);
router.get(
    '/audit-logs',
    authenticateToken,
    requireRole(['admin']),
    async (_req: Request, res: Response) => {
        try {
            const logs = await AuditLog.find().sort({ timestamp: -1 }).limit(100);
            res.json(logs);
        } catch (err) {
            console.error('Error fetching audit logs:', err);
            res.status(500).json({ message: 'Failed to fetch audit logs' });
        }
    }
);



export default router;