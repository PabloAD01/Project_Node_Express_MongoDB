import { Router } from "express";
const router = Router();


import {
  getAllJobs,
  getSingleJob,
  createJobs,
  updateJob,
  deleteJob,
  showStats
} from "../controllers/jobController.js";
import {
  validateJobInput,
  validateIdParam,
} from "../middleware/validationMiddleware.js";
import { authenticateUser, checkForTestUser } from "../middleware/authMiddleware.js";

router
.route("/")
.get(getAllJobs)
.post(checkForTestUser, validateJobInput, createJobs);

router.route("/stats").get(showStats);

router
.route("/:id")
.get(validateIdParam, getSingleJob)
.patch(checkForTestUser, validateJobInput, validateIdParam, updateJob)
.delete(checkForTestUser, validateIdParam, deleteJob);

export default router;

checkForTestUser