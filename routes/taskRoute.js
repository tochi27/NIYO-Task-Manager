const express = require("express");
const protect = require("../middleWare/authMiddleware");
const Task = require("../models/taskModel");
const {
  createTask,
  getAllTasks,
  getSingleTask,
  updateSingleTask,
  deleteTask,
  deleteAllTasks
} = require("../controllers/taskController");

const router = express.Router();

router.put("/createtask", createTask);
router.get("/getalltasks", protect, getAllTasks);
router.get("/getsingletask", protect, getSingleTask);
router.patch("/updatesingletask", protect, updateSingleTask);
router.delete("/deletesingletask", protect, deleteTask);
router.delete("/deletealltasks", protect, deleteAllTasks);

module.exports = router;
