import { Router } from "express";
import { createTodo, getTodos, updateTodo, deleteTodo } from "../controllers/todo.controller.js";
const router = Router();

router.route("/create").post(createTodo);
router.route("/get").post(getTodos);
router.route("/updatestatus").post(updateTodo);
router.route("/delete").post(deleteTodo);

export default router
