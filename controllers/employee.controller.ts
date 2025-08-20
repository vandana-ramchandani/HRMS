import { Request, Response, NextFunction } from "express";
import { findUsersByRole } from "../services/employee.services";
// import {
//   updateUserProfileSchema,
//   addDescriptionSchema,
// } from "../models/joi.validation.model";
import { AppError } from "../utils/helpers/ global.error.handler";
import { hashPassword } from "../utils/helpers/encrypt-decrypt";
import { ERROR_MESSAGES } from "../constants/errorMessage";
import { SUCCESS_MESSAGES } from "../constants/successmessage";
import User from "../models/user.model";
import { AuthenticatedRequest } from "../utils/helpers/authenticated.request";
export const getAllEmployees = async (
  req: AuthenticatedRequest,
  res: any
): Promise<any> => {
  try {
    const orgId = req.user.orgId;
    const employees = await findUsersByRole("employee", orgId);
    res.status(200).json({
      status: true,
      message: SUCCESS_MESSAGES.USERS_FOUND,
      timestamp: new Date(),
      data: employees,
    });
  } catch (err) {
    res.status(500).json({
      status: false,
      message: ERROR_MESSAGES.INTERNAL_ERROR,
      timestamp: new Date(),
    });
  }
};
