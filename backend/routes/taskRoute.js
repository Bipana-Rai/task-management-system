const express = require("express");
const TaskModel = require("../models/Users");

const router = express.Router();
const varify = require("../middleware/verifyToken");

router.get("/getTask", async (req, res) => {
  try {
    const task = await TaskModel.find().populate("createdBy", "fullName email");;
    res.status(200).json(task);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
router.post("/addTask", varify, async (req, res) => {
  const { project, tasks, members, due_date, status, priority, manager } =
    req.body


  try {
    const newTask = new TaskModel({
      project,
      tasks,
      members,
      due_date,
      status,
      priority,
      manager,
      createdBy: req.user.doesExist._id,
    });
    const savedTask = await newTask.save();
    const task = await TaskModel.findById(savedTask._id).populate("createdBy", "fullName email");
    res.status(201).json(task);
    console.log(savedTask);
  } catch (err) {
    // console.error("❌ Middleware error:", error);
    res.status(500).json({ message: err.message });
  }
});
router.patch("/updateTask/:id", async (req, res) => {
  try {
    const updateTask = await TaskModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!updateTask) {
      return res.status(404).json({ message: "Task not found" });
    }
    res.status(200).json(updateTask);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
router.delete("/:id/delete", async (req, res) => {
  try {
    await TaskModel.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Project deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
