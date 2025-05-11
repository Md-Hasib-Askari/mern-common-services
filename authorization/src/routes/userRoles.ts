import { Router } from 'express';
import { UserRole } from '../models/UserRole';

const router = Router();

// Assign Role to User
router.post('/', async (req, res) => {
    try {
        const userRole = new UserRole(req.body);
        await userRole.save();
        res.status(201).json({ success: true, userRole });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Internal Server Error." });
    }
});

// Get Roles for User
router.get('/:userId', async (req, res): Promise<any> => {
    try {
        const userRole = await UserRole.find({ userId: req.params.userId });
        if (!userRole) {
            return res.status(404).json({ error: 'User roles not found' });
        }
        res.json({ success: true, userRole });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Internal Server Error." });
    }
});

export default router;
