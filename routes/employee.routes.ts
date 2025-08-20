import express from "express";
import { getAllEmployees } from "../controllers/employee.controller";
import { authMiddleware } from "../middlewares/auth.middleware";
import {
  attendanceHistory,
  checkIn,
  checkOut,
  getTotalDuration,
} from "../controllers/attendance.controller";
import { applyLeave } from "../controllers/leave.controller";
import { validateLeave } from "../validate/validateAll";

const router = express.Router();

router.get("/", authMiddleware, getAllEmployees);

//attendance
router.post("/attendance/checkin", authMiddleware, checkIn);
router.post("/attendance/checkout", authMiddleware, checkOut);
router.get("/attendance/total-time", authMiddleware, getTotalDuration);
router.get("/attendance/history", authMiddleware, attendanceHistory);

//leave
router.post("/leave",authMiddleware,validateLeave,applyLeave)

export default router;
