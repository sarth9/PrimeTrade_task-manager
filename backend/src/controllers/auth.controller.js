import { User } from "../models/User.js";
import { generateToken } from "../utils/generateToken.js";
import { ApiResponse } from "../utils/ApiResponse.js";

export const registerUser = async (req, res) => {
  const { name, email, password } = req.body;

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return res.status(409).json({
      success: false,
      message: "User already exists"
    });
  }

  const user = await User.create({ name, email, password, role: "user" });

  const token = generateToken({ id: user._id, role: user.role });

  return res.status(201).json(
    new ApiResponse("201", "User registered successfully", {
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    })
  );
};

export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email }).select("+password");
  if (!user) {
    return res.status(401).json({
      success: false,
      message: "Invalid credentials"
    });
  }

  const isMatch = await user.comparePassword(password);
  if (!isMatch) {
    return res.status(401).json({
      success: false,
      message: "Invalid credentials"
    });
  }

  const token = generateToken({ id: user._id, role: user.role });

  return res.status(200).json(
    new ApiResponse("200", "Login successful", {
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    })
  );
};

export const getCurrentUser = async (req, res) => {
  return res.status(200).json(
    new ApiResponse("200", "Current user fetched successfully", req.user)
  );
};