import { Router } from "express";
import * as jobController from "../controllers/job.controller";
import { authMiddleware } from "../middlewares/auth.middleware";

const router = Router();

router.get("/:id", jobController.getById);

export default router;
