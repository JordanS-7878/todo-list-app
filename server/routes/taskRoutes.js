import express from "express";
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

// GET all tasks
router.get("/", async (req, res) => {
  try {
    const tasks = await Task.find();
    res.status(200).json(tasks);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to fetch tasks", error: err.message });
  }
});

// CREATE task
router.post("/", async (req, res) => {
  try {
    const task = await Task.create(req.body);
    res.status(201).json(task);
  } catch (err) {
    res.status(400).json({
      message: "Failed to create task",
      error: err.message,
    });
  }
});

// UPDATE task
router.put("/:id", async (req, res) => {
  try {
    const task = await Task.findByIdAndUpdate(req.params.id, req.body, {
      new: true, // Return newly updated document instead of the old one
    });

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.status(201).json(task);
  } catch (err) {
    res
      .status(400)
      .json({ message: "Failed to update task", error: err.message });
  }
});

// DELETE task
router.delete("/:id", async (req, res) => {
  try {
    const task = await Task.findByIdAndDelete(req.params.id);

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.status(200).json({ message: "Deleted successfully" });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to delete task", error: err.message });
  }
});

export default router;
