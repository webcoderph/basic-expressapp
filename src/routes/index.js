import { Router } from "express";
import TasksController from "../controllers/tasksController.js";
import UsersController from "../controllers/usersController.js";
import { authenticateToken } from "../middleware/index.js";
const router = Router();

router.get("/tasks", authenticateToken, TasksController.getAll);
router.post("/tasks", authenticateToken, TasksController.create);
router.put("/tasks/:id", authenticateToken, TasksController.update);
router.delete("/tasks/:id", authenticateToken, TasksController.delete);

router.post("/users", UsersController.register);
router.post("/users/auth", UsersController.login);

export default router;
