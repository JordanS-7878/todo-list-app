import bcrypt from "bcrypt";
import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import upload from "../middleware/uploadMiddleware.js";
import User from "../model/User.js";
import Task from "../model/Task.js";

const router = express.Router();

/*
  HTTP Status Code Cheat Sheet (MERN API)

  200 - OK (successful GET / update / delete)
  201 - Created (successful POST / new resource created)
  400 - Bad Request (invalid input / validation failed)
  404 - Not Found (resource doesn't exist)
  500 - Internal Server Error (something broke on server)
*/

// GET
router.get("/me", protect, async (req, res) => {
  try {
    const id = req.user.id;

    const user = await User.findById(id).select("-password");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json({ message: "User found successfully", user });
  } catch (err) {
    return res
      .status(500)
      .json({ message: "Failed to fetch user", error: err.message });
  }
});

/*
  UPDATE user profile info
  - NEVER update raw password directly here
  - Use separate route: `PUT /users/:id/password`
*/
router.put("/me", protect, upload.single("image"), async (req, res) => {
  try {
    const id = req.user.id;
    const allowedFields = ["firstName", "lastName", "email"];

    const updatedData = Object.fromEntries(
      Object.entries(req.body).filter(([key]) => allowedFields.includes(key)),
    );

    // ✅ IMPORTANT: store ONLY file path, not file object
    if (req.file) {
      updatedData.image = `/uploads/${req.file.filename}`;
    }

    const user = await User.findByIdAndUpdate(id, updatedData, {
      new: true,
      runValidators: true,
    }).select("-password");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json({ message: "User updated successfully", user });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// DELETE user
router.delete("/me", protect, async (req, res) => {
  try {
    const id = req.user.id;
    const user = await User.findByIdAndDelete(id).select("-password");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Use `deleteMany` to delete all tasks which `userId` equals `id`
    const userTasks = await Task.deleteMany({ userId: id });

    if (!userTasks) {
      return res.status(404).json({ message: "Tasks not found" });
    }

    return res
      .status(200)
      .json({ message: "User deleted successfully", user, userTasks });
  } catch (err) {
    return res
      .status(500)
      .json({ message: "Failed to delete user", error: err.message });
  }
});

router.put("/:id/password", protect, async (req, res) => {
  try {
    const { password } = req.body;

    if (!password) {
      return res.status(400).json({ message: "Password is required" });
    }

    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    user.password = hashedPassword;

    await user.save();

    const userData = {
      id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
    };

    return res
      .status(200)
      .json({ message: "User updated successfully", user: userData });
  } catch (err) {
    return res
      .status(500)
      .json({ message: "Failed to update user password", error: err.message });
  }
});

export default router;
