import { Router } from "express";
const router = Router();
import { login, register, logOut } from "../controllers/authController.js";
import {
  validateLogin,
  validateRegister,
} from "../middleware/validationMiddleware.js";
import rateLimit from "express-rate-limit";

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 10, // limit each IP to 100 requests per windowMs
  message: {msg:"IP rate limit exceeded, retry after 15 minutes"},
})

router.post("/register", limiter, validateRegister, register);
router.post("/login", limiter, validateLogin, login);
router.get("/logout", logOut);

export default router;
