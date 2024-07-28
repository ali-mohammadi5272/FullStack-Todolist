import express from "express";
import {
  addTodo,
  completeTodo,
  getAll,
  getTodo,
  removeTodo,
} from "../controllers/todoController.js";

const router = express.Router();

router.route("/").get(getAll).post(addTodo);
router.route("/:id").get(getTodo).delete(removeTodo).put(completeTodo);

export default router;
