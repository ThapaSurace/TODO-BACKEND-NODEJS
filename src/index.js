const express = require("express");
require("dotenv").config();
const connectDatabase = require("./database/dbConnect");
const cluster = require("cluster");
const totalcpus = require("os").cpus();

if (cluster.isMaster) {
  console.log(`Number of cups are ${totalcpus}`);
  console.log(`Master ${process.pid} is running`);

  // create worker thread
  for (let i; i < totalcpus; i++) {
    cluster.fork(); // if there is four cores...it will create four worker thread
  }

  // if worker thread die..generate new worker thread automatically
  cluster.on("exit", (worker, code, signal) => {
    console.log(`Worker ${worker.process.pid} died`);
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
