import { Router } from "express";
const router = Router();
import { login, register, getUsers } from "../controllers/authController.js";
import {
  validateLogin,
  validateRegister,
} from "../middleware/validationMiddleware.js";

router.post("/register", validateRegister, register);
router.post("/login", validateLogin, login);
router.get("/users", getUsers);

export default router;
