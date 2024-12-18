import "dotenv/config.js";
import express from "express";
import cors from "cors";
import morgan from "morgan";
import cluster from "cluster";
import router from "./routes/index.js";

const numCPUS = 2;

const app = express();
const PORT = process.env.PORT || 3030;

app.use(cors());
app.use(express.json());
app.use(morgan("combined"));
app.use("/api", router);

if (cluster.isMaster) {
  for (let i = 0; i < numCPUS; i++) {
    cluster.fork();
  }

  cluster.on("exit", (worker, code, signal) => {
    cluster.fork();
  });
} else {
  app.listen(PORT, () =>
    console.log(`Server id ${process.pid} Listening to port ${PORT}`),
  );
}
