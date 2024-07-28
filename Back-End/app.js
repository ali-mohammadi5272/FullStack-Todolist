import express from "express";
import todoRouter from "./router/todoRouter.js";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api/todos", todoRouter);

app.use((_, res) => {
  return res.status(400).json({
    message: "Bad Request ➡️ Wrong Method",
  });
});

export default app;
