import { Router } from "express";
import { authMiddleware } from "../middlewares/auth.middleware";

import { filterByYear, getAll } from "../controllers/holiday.controllers";

const router = Router();

router.get("/", authMiddleware, getAll);
router.get("/year/:year", authMiddleware, filterByYear);

export default router;
