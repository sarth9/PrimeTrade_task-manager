import { body } from "express-validator";

export const taskCreateValidator = [
  body("title").trim().notEmpty().withMessage("Title is required"),
  body("description").optional().trim(),
  body("status")
    .optional()
    .isIn(["pending", "in-progress", "completed"])
    .withMessage("Invalid status"),
  body("owner").optional().isMongoId().withMessage("Owner must be a valid user id")
];

export const taskUpdateValidator = [
  body("title").optional().trim().notEmpty().withMessage("Title cannot be empty"),
  body("description").optional().trim(),
  body("status")
    .optional()
    .isIn(["pending", "in-progress", "completed"])
    .withMessage("Invalid status"),
  body("owner").optional().isMongoId().withMessage("Owner must be a valid user id")
];