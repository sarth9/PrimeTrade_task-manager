import { User } from "../models/User.js";
import { ApiResponse } from "../utils/ApiResponse.js";

export const getAllUsers = async (req, res) => {
  const users = await User.find().select("-password").sort({ createdAt: -1 });

  return res
    .status(200)
    .json(new ApiResponse(200, "Users fetched successfully", users));
};