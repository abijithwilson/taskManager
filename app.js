const express = require("express");
const app = express();
const tasks = require("./routes/tasks");

app.use(express.json());

app.use("/task-manager/v1/tasks", tasks);

const PORT = 4000;

app.listen(PORT, (err) => {
  if (err) {
    console.log("Error ocurred cannot start the server");
  } else {
    console.log("Started the server");
  }
});
