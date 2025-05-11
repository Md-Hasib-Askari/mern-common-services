import { Router } from "express";
import { register, login, refreshTokenHandler, logout } from "../controllers/authController";
import { authenticateToken } from "../middlewares/authMiddleware";

const router = Router();

router.post("/register", register);
router.post("/login", login);
router.post('/refresh', refreshTokenHandler);
router.get("/logout", authenticateToken, logout);


export default router;