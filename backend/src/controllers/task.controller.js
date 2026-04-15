import mongoose from "mongoose";
import { Task } from "../models/Task.js";
import { User } from "../models/User.js";
import { ApiResponse } from "../utils/ApiResponse.js";

export const createTask = async (req, res) => {
  const { title, description, status, owner } = req.body;

  let taskOwner = req.user._id;

  if (req.user.role === "admin" && owner) {
    const userExists = await User.findById(owner);
    if (!userExists) {
      return res.status(404).json({
        success: false,
        message: "Assigned user not found"
      });
    }
    taskOwner = owner;
  }

  const task = await Task.create({
    title,
    description,
    status,
    owner: taskOwner,
    createdBy: req.user._id
  });

  const populatedTask = await Task.findById(task._id)
    .populate("owner", "name email role")
    .populate("createdBy", "name email role");

  return res
    .status(201)
    .json(new ApiResponse(201, "Task created successfully", populatedTask));
};

export const getTasks = async (req, res) => {
  const query = req.user.role === "admin" ? {} : { owner: req.user._id };

  const tasks = await Task.find(query)
    .populate("owner", "name email role")
    .populate("createdBy", "name email role")
    .sort({ createdAt: -1 });

  return res
    .status(200)
    .json(new ApiResponse(200, "Tasks fetched successfully", tasks));
};

export const getTaskById = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({
      success: false,
      message: "Invalid task id"
    });
  }

  const task = await Task.findById(id)
    .populate("owner", "name email role")
    .populate("createdBy", "name email role");

  if (!task) {
    return res.status(404).json({
      success: false,
      message: "Task not found"
    });
  }

  const isOwner = task.owner._id.toString() === req.user._id.toString();
  const isAdmin = req.user.role === "admin";

  if (!isAdmin && !isOwner) {
    return res.status(403).json({
      success: false,
      message: "Forbidden: you can only access your own tasks"
    });
  }

  return res
    .status(200)
    .json(new ApiResponse(200, "Task fetched successfully", task));
};

export const updateTask = async (req, res) => {
  const { id } = req.params;
  const { title, description, status, owner } = req.body;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({
      success: false,
      message: "Invalid task id"
    });
  }

  const task = await Task.findById(id);

  if (!task) {
    return res.status(404).json({
      success: false,
      message: "Task not found"
    });
  }

  const isOwner = task.owner.toString() === req.user._id.toString();
  const isAdmin = req.user.role === "admin";

  if (!isAdmin && !isOwner) {
    return res.status(403).json({
      success: false,
      message: "Forbidden: you can only update your own tasks"
    });
  }

  task.title = title ?? task.title;
  task.description = description ?? task.description;
  task.status = status ?? task.status;

  if (isAdmin && owner) {
    const userExists = await User.findById(owner);
    if (!userExists) {
      return res.status(404).json({
        success: false,
        message: "Assigned user not found"
      });
    }
    task.owner = owner;
  }

  await task.save();

  const updatedTask = await Task.findById(task._id)
    .populate("owner", "name email role")
    .populate("createdBy", "name email role");

  return res
    .status(200)
    .json(new ApiResponse(200, "Task updated successfully", updatedTask));
};

export const deleteTask = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({
      success: false,
      message: "Invalid task id"
    });
  }

  const task = await Task.findById(id);

  if (!task) {
    return res.status(404).json({
      success: false,
      message: "Task not found"
    });
  }

  const isOwner = task.owner.toString() === req.user._id.toString();
  const isAdmin = req.user.role === "admin";

  if (!isAdmin && !isOwner) {
    return res.status(403).json({
      success: false,
      message: "Forbidden: you can only delete your own tasks"
    });
  }

  await task.deleteOne();

  return res
    .status(200)
    .json(new ApiResponse(200, "Task deleted successfully"));
};