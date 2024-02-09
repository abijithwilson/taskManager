const express = require("express");
const router = express.Router();

const {
  getAllTasks,
  getSingleTask,
  createTask,
  updateTask,
  deleteTasks,
  getBasedOnPriority,
} = require("../controllers/tasks");

router.route("/").get(getAllTasks).post(createTask);
router.route("/:id").get(getSingleTask).put(updateTask).delete(deleteTasks);
router.route("/priority/:priority").get(getBasedOnPriority);

module.exports = router;