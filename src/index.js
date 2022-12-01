const express = require("express");
const cluster = require("cluster");
const totalCpus = require("os").cpus().length;
require("dotenv").config();
const connectDatabase = require("./database/dbConnect");

if (cluster.isMaster) {
  console.log(`Number of CPUs are ${totalCpus}`);
  console.log(`Master ${process.pid} is running`);

  // Create worker threads
  for (let i = 0; i < totalCpus; i++) {
    cluster.fork();
  }
  cluster.on("exit", (worker, code, signal) => {
    console.log(`Worker ${worker.process.pid} died`);
    console.log(`Let fork another worker`);
    cluster.fork();
  });
} else {
  const PORT = process.env.PORT || 4500;
  const app = express();

  // build in middleware for json data
  app.use(express.json());

  // build-in middlware for form data
  app.use(express.urlencoded({ extended: false }));

  app.use("/rest/todos", require("./routes/todoRoutes"));
  app.use("/rest/users", require("./routes/userRoutes"));

  app.listen(PORT, () => {
    connectDatabase();
    console.log(`Server starting at ${PORT}`);
  });
}
