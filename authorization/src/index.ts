// File: src/index.ts
import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import roleRoutes from './routes/roles';
import permissionRoutes from './routes/permissions';
import userRoleRoutes from './routes/userRoles';
import { checkPermission } from './middlewares/checkPermission';

dotenv.config();

const app = express();
app.use(express.json());

// Routes
app.use('/api/roles', roleRoutes);
app.use('/api/permissions', permissionRoutes);
app.use('/api/user-roles', userRoleRoutes);

// Example route for checking permissions
app.delete('/posts/:id', checkPermission('delete:post'), async (req, res) => {
    // Proceed to delete the post
    res.send(`Post ${req.params.id} deleted.`);
});


// MongoDB Connection
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/authz';
mongoose
    .connect(MONGO_URI)
    .then(() => console.log('MongoDB connected'))
    .catch((err) => console.error('MongoDB connection error:', err));

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`AuthZ service running on port ${PORT}`));
