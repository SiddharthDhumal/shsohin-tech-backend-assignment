import { Router } from "express";
import { AuthController } from "../controllers/authController.js";
import { UserController } from "./../controllers/userController.js";
import verifyUser from "../middlewares/verify.js";

const router = Router();

// Auth Routes
router.post("/auth/register", AuthController.register);
router.post("/auth/login", AuthController.login);

// CRUD Operation Routes with authorization
router.get("/users", verifyUser, UserController.getAllUsers);
router
	.route("/users/:id")
	.get(verifyUser, UserController.getUserById)
	.put(verifyUser, UserController.updateUser)
	.delete(verifyUser, UserController.deleteUser);

export default router;
