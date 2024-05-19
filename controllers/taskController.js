const express = require("express");
const Task = require("../models/taskModel");
const asynchandler = require("express-async-handler");
const { respondsSender } = require("../middleWare/responseHandler");
const { ResponseCode } = require("../utils/responseCode");

// CREATE
// Create a task
const createTask = asynchandler(async (req, res) => {
  // Collect data from body
  const { userId, taskName, taskStatus } = req.body;
  // Validate data
  if (!userId || !taskName || !taskStatus) {
    // Send error message
    const responseMessage =
      "User ID, Task Name or Task Status not included in body request";
    return respondsSender(null, responseMessage, ResponseCode.badRequest, res);
  }

  try {
    // Attempt to create a new task
    const task = await Task.create({
      userId,
      taskName,
      taskStatus,
    });

    // Return success response
    const responseMessage = "Task created";
    return respondsSender(task, responseMessage, ResponseCode.successful, res);
  } catch (error) {
    // Otherwise, return failure response
    const responseMessage = "Error: " + error.message;
    return respondsSender(null, responseMessage, ResponseCode.badRequest, res);
  }
});

// READ
// Get all tasks
const getAllTasks = asynchandler(async (req, res) => {
  // Collect data from body
  const { userId } = req.query;
  // Validate data
  if (!userId) {
    // Send error message
    const responseMessage = "User ID not included in body request";
    return respondsSender(null, responseMessage, ResponseCode.badRequest, res);
  }

  try {
    const tasks = await Task.find({ userId });

    // Check if tasks exist
    if (!tasks || tasks.length === 0) {
      // Send error message if no tasks found
      const responseMessage = "No has been created by user";
      return respondsSender(null, responseMessage, ResponseCode.noData, res);
    }

    // Return success response with tasks
    const responseMessage = "Tasks retrieved successfully";
    return respondsSender(tasks, responseMessage, ResponseCode.successful, res);
  } catch (error) {
    // Handle errors
    const responseMessage = "Error: " + error.message;
    return respondsSender(
      null,
      responseMessage,
      ResponseCode.internalServerError,
      res
    );
  }
});

// Get a single task
const getSingleTask = asynchandler(async (req, res) => {
  // Collect data from body
  const { userId, taskId } = req.query;
  // Validate data
  if (!userId || !taskId) {
    // Send error message
    const responseMessage = "User ID or Task Id not included in body request";
    return respondsSender(null, responseMessage, ResponseCode.badRequest, res);
  }

  try {
    const task = await Task.findOne({ $and: [{ userId }, { _id: taskId }] });

    if (!task) {
      const responseMessage = `No task found with id: ${taskId} for user: ${userId}`;
      return respondsSender(null, responseMessage, ResponseCode.noData, res);
    }
    const responseMessage = "Task retrieved successfully";
    return respondsSender(task, responseMessage, ResponseCode.successful, res);
  } catch (error) {
    const responseMessage = "Error: " + error.message;
    return respondsSender(
      null,
      responseMessage,
      ResponseCode.internalServerError,
      res
    );
  }
});

// UPDATE
// Update a single field
const updateSingleTask = asynchandler(async (req, res) => {
    // Collect data from URL parameters
    const { userId, taskId } = req.query;
  
    // Validate data
    if (!userId || !taskId) {
      // Send error message
      const responseMessage = "User ID or Task Id not included in URL parameters";
      return respondsSender(null, responseMessage, ResponseCode.badRequest, res);
    }
  
    // Collect data from request body
    const { taskName, taskStatus } = req.body;
  
    try {
      // Find and update the task
      const updatedTask = await Task.findOneAndUpdate(
        { _id: taskId, userId: userId }, // Criteria to find the task
        { taskName: taskName, taskStatus: taskStatus }, // Fields to update
        { new: true } // Option to return the updated document
      );
  
      if (!updatedTask) {
        const responseMessage = `No task found with id: ${taskId} for user: ${userId}`;
        return respondsSender(null, responseMessage, ResponseCode.noData, res);
      }
  
      const responseMessage = "Task updated successfully";
      return respondsSender(
        updatedTask,
        responseMessage,
        ResponseCode.successful,
        res
      );
    } catch (error) {
      const responseMessage = "Error: " + error.message;
      return respondsSender(
        null,
        responseMessage,
        ResponseCode.internalServerError,
        res
      );
    }
  });
  

// DELETE
// Delete a single task
const deleteTask = asynchandler(async (req, res) => {
  const { userId, taskId } = req.body;
  // Validate data
  if (!userId || !taskId) {
    // Send error message
    const responseMessage = "User ID or Task Id not included in body request";
    return respondsSender(null, responseMessage, ResponseCode.badRequest, res);
  }
  try {
    const task = await Task.findOneAndDelete({
      $and: [{ userId }, { _id: taskId }],
    });

    if (!task) {
      // If no task was found and deleted
      const responseMessage = `No tasks with id: ${taskId}`;
      return respondsSender(
        null,
        responseMessage,
        ResponseCode.badRequest,
        res
      );
    }

    // If task was successfully deleted
    const responseMessage = `Task deleted successfully`;
    return respondsSender(task, responseMessage, ResponseCode.successful, res);
  } catch (error) {
    // If an error occurred during the deletion process
    const responseMessage = error.message;
    return respondsSender(null, responseMessage, ResponseCode.successful, res);
  }
});

// Delete all tasks
const deleteAllTasks = asynchandler(async (req, res) => {
    // Collect data from body
    const { userId } = req.query;
    // Validate data
    if (!userId) {
      // Send error message
      const responseMessage = "User ID not included in body request";
      return respondsSender(null, responseMessage, ResponseCode.badRequest, res);
    }
  
    try {
      // Delete all tasks associated with the user
      const result = await Task.deleteMany({ userId });
  
      // Check if any tasks were deleted
      if (result.deletedCount === 0) {
        // Send error message if no tasks were deleted
        const responseMessage = "No tasks found for the user";
        return respondsSender(null, responseMessage, ResponseCode.noData, res);
      }
  
      // Return success response
      const responseMessage = "All tasks deleted successfully";
      return respondsSender(null, responseMessage, ResponseCode.successful, res);
    } catch (error) {
      // Handle errors
      const responseMessage = "Error: " + error.message;
      return respondsSender(
        null,
        responseMessage,
        ResponseCode.internalServerError,
        res
      );
    }
  });
  

module.exports = {
  createTask,
  getAllTasks,
  getSingleTask,
  updateSingleTask,
  deleteTask,
  deleteAllTasks
};
