import express from "express";
import { protect } from "../middleware/authMiddleware.js";
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

// GET user-specific tasks
router.get("/", protect, async (req, res) => {
  try {
    const userId = req.user.id;
    const tasks = await Task.find({ userId: userId });
    res.status(200).json({ message: "Task found successfully", tasks });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to fetch tasks", error: err.message });
  }
});

// CREATE task
router.post("/", protect, async (req, res) => {
  try {
    const task = await Task.create({ ...req.body, userId: req.user.id });
    res.status(200).json({ message: "Task created successfully", task });
  } catch (err) {
    res.status(400).json({
      message: "Failed to create task",
      error: err.message,
    });
  }
});

// UPDATE task
router.put("/:id", protect, async (req, res) => {
  try {
    const task = await Task.findByIdAndUpdate(req.params.id, req.body, {
      new: true, // Return newly updated document instead of the old one
    });

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.status(200).json({ message: "Task updated successfully", task });
  } catch (err) {
    res
      .status(400)
      .json({ message: "Failed to update task", error: err.message });
  }
});

// DELETE task
router.delete("/:id", protect, async (req, res) => {
  try {
    const task = await Task.findByIdAndDelete(req.params.id);

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.status(200).json({ message: "Task deleted successfully", task });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to delete task", error: err.message });
  }
});

export default router;
