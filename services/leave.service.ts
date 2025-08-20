import { ERROR_MESSAGES } from "../constants/errorMessage";
import LeaveModel from "../models/leave.model";
import { getPaginationParams } from "../utils/helpers/pagination";

export const applyLeaveService = (
  userId: string,
  orgId: string,
  leaveType: string,
  startDate: string,
  endDate: string,
  days: string,
  reason: string,
  notify: []
) => {
  try {
    const leave = new LeaveModel({
      userId,
      orgId,
      leaveType,
      startDate,
      endDate,
      days,
      reason,
      notify,
    });
    return leave.save();
  } catch (error) {
    throw new Error(ERROR_MESSAGES.LEAVE_APPLY_FAILED);
  }
};

export const getAllLeaveService = async (
  role: string,
  id: string,
  limit: number,
  page: number
) => {
  let query: any = {};

  if (role === "employee") {
    query = { userId: id };
  } else if (role === "organisation") {
    query = { orgId: id };
  }

  const { skip, limit: pageSize } = await getPaginationParams(page, limit);

  const totalLeaves = await LeaveModel.countDocuments(query);
  const totalPages = Math.ceil(totalLeaves / pageSize);

  const leaves = await LeaveModel.find(query)
    .populate("userId", "name email")
    .populate("actionTakenBy", "name")
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(pageSize)
    .select("-__v ");

  return { leaves, totalPages };
};

export const leaveResponseService = async (
  leaveId: string,
  userId: string,
  status: string,
  rejectReason?: string
) => {
  const leave = await LeaveModel.findByIdAndUpdate(
    leaveId,
    {
      status,
      actionTakenOn: new Date(),
      actionTakenBy: userId,
      rejectReason: rejectReason || null,
    },
    { new: true }
  );
  return leave;
};

export const getAllLeavebyUserService = async (
  userId: string,
  limit: number,
  page: number
) => {
  const { skip, limit: pageSize } = await getPaginationParams(page, limit);

  const totalLeaves = await LeaveModel.countDocuments({ userId });
  const totalPages = Math.ceil(totalLeaves / pageSize);

  const leaves = await LeaveModel.find({ userId })
    .populate("userId", "name email")
    .populate("actionTakenBy", "name")
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(pageSize)
    .select("-__v ");

  return { leaves, totalPages };
}
