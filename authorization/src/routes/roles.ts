import { Router } from 'express';
import { Role } from '../models/Role';

const router = Router();

// Create Role
router.post('/', async (req, res) => {
    try {
        const role = new Role(req.body);
        await role.save();
        res.status(201).json({ success: true, role });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// Get All Roles
router.get('/', async (_req, res) => {
    try {
        const roles = await Role.find();
        res.json(roles);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Update Role
router.put('/:id', async (req, res) => {
    try {
        const updated = await Role.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json({ success: true, role: updated });
    } catch (err) {
        console.error(err);
        res.status(400).json({ error: "Internal Server Error" });
    }
});

// Delete Role
router.delete('/:id', async (req, res) => {
    try {
        await Role.findByIdAndDelete(req.params.id);
        res.sendStatus(204);
    } catch (err) {
        console.error(err);
        res.status(400).json({ error: "Internal Server Error" });
    }
});

export default router;
