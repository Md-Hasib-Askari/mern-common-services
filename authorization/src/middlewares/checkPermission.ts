import { Request, Response, NextFunction } from 'express';
import { UserRole } from '../models/UserRole';
import { Role } from '../models/Role';

/**
 * Middleware to check if user has the required permission.
 * @param requiredPermission - e.g., 'delete:post'
 */
export const checkPermission = (requiredPermission: string) => {
    return async (req: Request, res: Response, next: NextFunction): Promise<any> => {
        const userId = req.header('x-user-id');

        if (!userId) {
            return res.status(401).json({ error: 'Missing user ID' });
        }

        try {
            // Get all roles assigned to this user
            const userRoles = await UserRole.find({ userId });

            const roleNames = userRoles.map(ur => ur.role);

            // Fetch roles from DB
            const roles = await Role.find({ name: { $in: roleNames } });

            // Collect all permissions from user's roles
            const userPermissions = new Set(
                roles.flatMap(role => role.permissions)
            );

            if (!userPermissions.has(requiredPermission)) {
                return res.status(403).json({ error: 'Forbidden: insufficient permissions' });
            }

            next();
        } catch (err) {
            console.error('Permission check error:', err);
            res.status(500).json({ error: 'Server error' });
        }
    };
};
