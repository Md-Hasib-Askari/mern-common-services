import { Request, Response, NextFunction } from "express";

export const requireRole = (roles: string[]) => {
    return (req: Request, res: Response, next: NextFunction): any => {
        const user = req.headers.user ? JSON.parse(req.headers.user as string) : null;

        if (!user) {
            return res.status(401).json({ message: "Unauthorized" });
        }

        const hasRole = roles.some(role => user.roles.includes(role));

        if (!hasRole) {
            return res.status(403).json({ message: "Forbidden" });
        }

        next();
    };
}