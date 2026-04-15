import { Router } from "express";
import { getAllUsers } from "../controllers/user.controller.js";
import { protect, authorize } from "../middlewares/auth.middleware.js";
import { asyncHandler } from "../middlewares/asyncHandler.js";

const router = Router();

router.get("/", protect, authorize("admin"), asyncHandler(getAllUsers));

export default router;