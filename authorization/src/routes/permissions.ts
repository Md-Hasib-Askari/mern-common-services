import { Router } from 'express';
import { Permission } from '../models/Permission';

const router = Router();

// Create Permission
router.post('/', async (req, res) => {
    try {
        const permission = new Permission(req.body);
        await permission.save();
        res.status(201).json({ success: true, permission });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Internal Server Error." });
    }
});

// Get All Permissions
router.get('/', async (_req, res) => {
    try {
        const permissions = await Permission.find();
        res.json({ success: true, permissions });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Internal Server Error." });
    }
});


export default router;
