import { Router } from "express";
import { getCurrentUser, loginUser, registerUser } from "../controllers/auth.controller.js";
import { asyncHandler } from "../middlewares/asyncHandler.js";
import { protect } from "../middlewares/auth.middleware.js";
import { validateRequest } from "../middlewares/validate.middleware.js";
import { loginValidator, registerValidator } from "../validators/auth.validator.js";

const router = Router();

router.post("/register", registerValidator, validateRequest, asyncHandler(registerUser));
router.post("/login", loginValidator, validateRequest, asyncHandler(loginUser));
router.get("/me", protect, asyncHandler(getCurrentUser));

export default router;