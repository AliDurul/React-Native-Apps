import { Router } from "express";
import userRoutes from "./user.route";
import authRoutes from "./auth.route";
import videoRoutes from "./video.route";
import tokenRoutes from "./token.route";

const router = Router();

// authRoutes
router.use('/auth', authRoutes);

// userRoutes
router.use("/users", userRoutes);

// videoRoutes
router.use("/videos", videoRoutes);

// tokenRoutes
router.use("/tokens", tokenRoutes);

export default router;