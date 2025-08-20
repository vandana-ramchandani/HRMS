import { ERROR_MESSAGES } from "../constants/errorMessage";
import { SUCCESS_MESSAGES } from "../constants/successmessage";
import {
  handleCheckIn,
  handleCheckOut,
  calculateTotalDuration,
  getAttendanceHistory,
} from "../services/attendance.service";
import moment from "moment";

export const checkIn = async (req: any, res: any) => {
  try {
    const userId = (req as any).user.userId;
    const attendance = await handleCheckIn(userId);
    return res
      .status(200)
      .json({ status: true, message: SUCCESS_MESSAGES.CHECKED_IN, data:attendance });
  } catch (error: any) {
    return res.status(400).json({status:false, message:ERROR_MESSAGES.ATTENDANCE_CHECK_IN_FAILED });
  }
};

export const checkOut = async (req: any, res: any) => {
  try {
    const userId = (req as any).user.userId;
    const attendance = await handleCheckOut(userId);

    return res
      .status(200)
      .json({ status: true, message: SUCCESS_MESSAGES.CHECKED_OUT, data:attendance });
  } catch (error: any) {
    return res.status(400).json({status:false, message:ERROR_MESSAGES.ATTENDANCE_CHECK_OUT_FAILED });
  }
};

export const getTotalDuration = async (req: any, res: any) => {
  try {
    const userId = (req as any).user.userId;
    const date = (req.query.date as string) || moment().format("YYYY-MM-DD");
    const duration = await calculateTotalDuration(userId, date);

    return res.status(200).json({
      status: true,
      message: SUCCESS_MESSAGES.TOTAL_DURATION_CALCULATED,
      data: duration,
    });
  } catch (error: any) {
    return res.status(400).json({status:false, message:ERROR_MESSAGES.ATTENDANCE_GET_TOTAL_DURATION_FAILED });
  }
};

export const attendanceHistory = async (req: any, res: any) => {
  try {
    const userId = (req as any).user.userId;
    const history = await getAttendanceHistory(userId);

    return res.status(200).json({
      status: true,
      message: SUCCESS_MESSAGES.ATTENDANCE_HISTORY_FETCHED,
      data: history,
    });
  } catch (error: any) {
    return res.status(400).json({ status: false, message:ERROR_MESSAGES.ATTENDANCE_HISTORY_FETCH_FAILED });
  }
};