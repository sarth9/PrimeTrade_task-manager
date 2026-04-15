import { Router } from "express";
import {
  createTask,
  deleteTask,
  getTaskById,
  getTasks,
  updateTask
} from "../controllers/task.controller.js";
import { asyncHandler } from "../middlewares/asyncHandler.js";
import { protect } from "../middlewares/auth.middleware.js";
import { validateRequest } from "../middlewares/validate.middleware.js";
import { taskCreateValidator, taskUpdateValidator } from "../validators/task.validator.js";

const router = Router();

router.use(protect);

router.post("/", taskCreateValidator, validateRequest, asyncHandler(createTask));
router.get("/", asyncHandler(getTasks));
router.get("/:id", asyncHandler(getTaskById));
router.put("/:id", taskUpdateValidator, validateRequest, asyncHandler(updateTask));
router.delete("/:id", asyncHandler(deleteTask));

export default router;