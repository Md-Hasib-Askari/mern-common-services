import { Router, Request, Response } from 'express';
import { authenticateToken } from '../middlewares/authMiddleware';

const router = Router();

router.get('/me', authenticateToken, (req: Request, res: Response) => {
    const user = (req as any).user;
    res.json({ message: 'This is a protected route', user });
});

export default router;
