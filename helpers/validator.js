class Validator {
  static validateTaskInfo(taskInfo) {
    if (
      taskInfo.hasOwnProperty("id") &&
      taskInfo.hasOwnProperty("title") &&
      taskInfo.hasOwnProperty("description") &&
      taskInfo.hasOwnProperty("completed") &&
      taskInfo.hasOwnProperty("priority") &&
      taskInfo.hasOwnProperty("createdAt")
    ) {
      return {
        status: true,
        message: "Task has been validated",
      };
    } else {
      return {
        status: false,
        message: "Task Info is malformed, please provide me all the parameters",
      };
    }
  }
}

module.exports = Validator;
