const mongoose = require("mongoose");

const taskSchema = mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref:"user",
      required: [true, "Please add a task"],
    },
    taskName: {
      type: String,
      required: [true, "Please add a task"],
    },

    taskStatus: {
      type: String,
      required: true,
      default: "pending",
      enum: ["pending", "canceled", "in progress", "completed"],
    },
  },

  {
    timestamps: true,
  }
);

const Task = mongoose.model("Task", taskSchema);

module.exports = Task;
