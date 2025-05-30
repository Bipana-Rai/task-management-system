const mongoose = require("mongoose");
const TaskSchema = new mongoose.Schema(
  {
    project: String,
    tasks: [String],
    members: [String],
    due_date: String,
    status: String,
    priority: String,
    manager: String,
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
    },
  },
  { timestamps: true }
);
const TaskModel = mongoose.model("tasks", TaskSchema);
module.exports = TaskModel;
