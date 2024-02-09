const taskData = require("../tasks.json");
const Validator = require("../helpers/validator");
const fs = require("fs");

const getAllTasks = (req, res) => {
  return res.status(200).json(taskData);
};

const getSingleTask = (req, res) => {
  const allTasks = taskData.tasks;
  let filteredTask = allTasks.filter((task) => task.id == req.params.id);
  if (filteredTask.length == 0) {
    return res.status(404).send("No appropriate task found");
  }
  return res.status(200).json(filteredTask);
};

const createTask = (req, res) => {
  const userProvidedDetails = req.body;
  if (Validator.validateTaskInfo(userProvidedDetails).status == true) {
    const taskDataModified = taskData;
    taskDataModified.tasks.push(userProvidedDetails);
    fs.writeFile(
      "./tasks.json",
      JSON.stringify(taskDataModified),
      {
        encoding: "utf8",
        flag: "w",
      },
      (err, data) => {
        if (err) {
          return res
            .status(500)
            .send(
              "Something went wrong while creating the task, please try again"
            );
        } else {
          return res.status(201).send("Task has been validated and created");
        }
      }
    );
  } else {
    return res
      .status(400)
      .json(Validator.validateTaskInfo(userProvidedDetails));
  }
};

const updateTask = (req, res) => {
  const taskId = req.params.id;
  const { title, description, completed, priority, createdAt } = req.body;
  const taskDataModified = taskData;

  const taskToUpdate = taskDataModified.tasks.find((task) => task.id == taskId);

  if (!taskToUpdate) {
    return res.status(404).send("No appropriate task found");
  }

  if (title) taskToUpdate.title = title;
  if (description) taskToUpdate.description = description;
  if (completed !== undefined) taskToUpdate.completed = completed;
  if (priority) taskToUpdate.priority = priority;
  if (createdAt) taskToUpdate.createdAt = createdAt;

  fs.writeFile(
    "./tasks.json",
    JSON.stringify(taskDataModified),
    {
      encoding: "utf8",
      flag: "w",
    },
    (err, data) => {
      if (err) {
        return res
          .status(500)
          .send(
            "Something went wrong while updating the task, please try again"
          );
      } else {
        return res.status(200).send("Task has been updated");
      }
    }
  );
};

const deleteTasks = (req, res) => {
  const taskId = req.params.id;
  const taskDataModified = taskData;

  const taskIndex = taskDataModified.tasks.findIndex(
    (task) => task.id == taskId
  );

  if (taskIndex === -1) {
    return res.status(404).send("No appropriate task found");
  }

  taskDataModified.tasks.splice(taskIndex, 1);

  fs.writeFile(
    "./tasks.json",
    JSON.stringify(taskDataModified),
    { encoding: "utf8", flag: "w" },
    (err, data) => {
      if (err) {
        return res
          .status(500)
          .send("Error updating the tasks to the file, please try again");
      } else {
        return res
          .status(200)
          .send(`Task with id:${taskId} deleted successfully`);
      }
    }
  );
};

const getBasedOnPriority = (req, res) => {
  const taskDataModified = taskData;
  const priority = req.params.priority.toLowerCase();
  const filteredTasks = taskDataModified.tasks.filter(
    (task) => task.priority.toLowerCase() === priority
  );

  if (filteredTasks.length === 0) {
    return res
      .status(404)
      .send("No tasks found for the specified priority level");
  }

  res.status(200).json(filteredTasks);
};

module.exports = {
  getAllTasks,
  getSingleTask,
  createTask,
  updateTask,
  deleteTasks,
  getBasedOnPriority,
};
