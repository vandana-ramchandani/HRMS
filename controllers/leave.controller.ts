import { Request } from "express";
import {
  applyLeaveService,
  getAllLeavebyUserService,
  getAllLeaveService,
  leaveResponseService,
} from "../services/leave.service";
import { SUCCESS_MESSAGES } from "../constants/successmessage";
import { AuthenticatedRequest } from "../utils/helpers/authenticated.request";

export const applyLeave = async (req: Request, res: any) => {
  try {
    const { userId, orgId } = req.user;
    const { leaveType, startDate, endDate, days, reason, notify } = req.body;
    const reponse = await applyLeaveService(
      userId,
      orgId,
      leaveType,
      startDate,
      endDate,
      days,
      reason,
      notify
    );
    res.status(201).json({
      status: true,
      message: SUCCESS_MESSAGES.LEAVE_APPLIED,
      timestamp: new Date(),
    });
  } catch (error: any) {
    res
      .status(400)
      .json({ stauts: false, message: error.message, timestamp: new Date() });
  }
};

export const getAllLeaves = async (req: AuthenticatedRequest, res: any) => {
  try {
    const { userId, role, orgId } = req.user;
    const limit = parseInt(req.query.limit as string);
    const page = parseInt(req.query.page as string);

    const leaves = await getAllLeaveService(role, userId, limit, page);
    res.status(200).json({
      status: true,
      message:SUCCESS_MESSAGES.LEAVE_FETCHED,
      data: leaves,
      timestamp: new Date(),
    });
  } catch (error: any) {
    res
      .status(400)
      .json({ status: false, message: error.message, timestamp: new Date() });
  }
};

export const leaveResponse = async (req: Request, res: any) => {
  try {
    const { userId } = req.user;
    const { id } = req.params;
    const { status, rejectReason } = req.body;

    await leaveResponseService(id, userId, status, rejectReason);

    return res.status(200).json({
      status: true,
      message: `Leave has been ${status}.`,
      timestamp: new Date(),
    });
  } catch (error: any) {
    return res.status(400).json({
      status: false,
      message: error.message,
      timestamp: new Date(),
    });
  }
};

export const getAllLeavesOfUser = async (req: Request, res: any) => {
  try {
    const { userId } = req.params;
    const limit = parseInt(req.query.limit as string);
    const page = parseInt(req.query.page as string);

    const leaves = await getAllLeavebyUserService(userId, limit, page);
    res.status(200).json({
      status: true,
      message: SUCCESS_MESSAGES.LEAVE_FETCHED,
      data: leaves,
      timestamp: new Date(),
    });
  } catch (error: any) {
    res
      .status(400)
      .json({ status: false, message: error.message, timestamp: new Date() });
  }
}
