import express, { Request, Response } from "express";
import User from "../models/user.model";
import {
  createUserData,
  fetchById,
  updateUserData,
  getOrganizationData,
  updateOrganizationData,
  uploadLogoService,
  deleteLogoService,
  createProfileService,
} from "../services/org.service";
import { AppError } from "../utils/helpers/ global.error.handler";
import { ERROR_MESSAGES } from "../constants/errorMessage";
import { SUCCESS_MESSAGES } from "../constants/successmessage";
import { genrateEmpId, getDeptDetails } from "../utils/helpers/generate.Id";
import { timeStamp } from "console";
import { AuthenticatedRequest } from "../utils/helpers/authenticated.request";

export const createUser = async (
  req: AuthenticatedRequest,
  res: any
): Promise<void> => {
  try {
    const result = await createUserData(req);
    res.status(201).json(result);
  } catch (error) {
    res.status(500).json({
      status: false,
      message: ERROR_MESSAGES.INTERNAL_ERROR,
      timestamp: new Date().toISOString(),
    });
  }
};
export const getAllUsers = async (
  req: AuthenticatedRequest,
  res: any
): Promise<any> => {
  try {
    const { userId, orgId, role } = req.user;
    const { page, limit } = req.query;
    const pageNumber = parseInt(page as string);
    const pageSize = parseInt(limit as string);
    if (
      isNaN(pageNumber) ||
      isNaN(pageSize) ||
      pageNumber <= 0 ||
      pageSize <= 0
    ) {
      return res.status(400).json({
        status: false,
        message: "Page and limit must be positive numbers.",
        timestamp: new Date(),
      });
    }
    const skip = (pageNumber - 1) * pageSize;
    const resolvedOrgId = role === "organisation" ? userId : orgId;
    const filter = {
      role: "employee",
      orgId: resolvedOrgId,
    };
    const users = await User.find(filter)
      .skip(skip)
      .limit(pageSize)
      .select("name email _id role isActive empId departmentName orgId");
    const totalUsers = await User.countDocuments(filter);
    const totalPages = Math.ceil(totalUsers / pageSize);
    res.status(200).json({
      status: true,
      message: SUCCESS_MESSAGES.GET_ALL_EMPLOYEE,
      data: {
        data: users,
        totalPages,
        totalUsers,
      },
    });
  } catch (error) {
    throw new AppError(ERROR_MESSAGES.USERS_NOT_FOUND, 404);
  }
};
export const getUser = async (
  req: express.Request,
  res: express.Response
): Promise<void> => {
  try {
    const user = await fetchById(req.params.id);
    res.status(200).json({
      status: true,
      message: SUCCESS_MESSAGES.USER_FOUND,
      timestamp: new Date(),
      data: user,
    });
  } catch (error) {
    throw new AppError(ERROR_MESSAGES.USER_NOT_FOUND, 404);
  }
};
export const updateUser = async (
  req: express.Request,
  res: express.Response
): Promise<void> => {
  try {
    const userId = req.params.id;
    const updates = req.body;
    const updatedUser = await updateUserData(userId, updates);
    res.status(200).json({
      status: true,
      message: SUCCESS_MESSAGES.USER_UPDATED,
      timestamp: new Date(),
      data: updatedUser,
    });
  } catch (error) {
    res.status(500).json({ message: ERROR_MESSAGES.UPDATE_USER_ERROR, error });
  }
};
export const deleteUser = async (
  req: express.Request,
  res: express.Response
): Promise<void> => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) throw new Error(ERROR_MESSAGES.NOT_FOUND);
    res.status(200).json({ message: SUCCESS_MESSAGES.USER_DELETED });
  } catch (error) {
    throw new AppError(ERROR_MESSAGES.DELETE_USER_ERROR, 400);
  }
};
export const deleteAllUsers = async (
  req: express.Request,
  res: express.Response
): Promise<void> => {
  try {
    const user = await User.deleteMany();
    if (!user) throw new Error(ERROR_MESSAGES.NOT_FOUND);
    res.status(200).json({ message: SUCCESS_MESSAGES.USER_DELETED });
  } catch (error) {
    throw new AppError(ERROR_MESSAGES.DELETE_USER_ERROR, 400);
  }
};
export const getOrganization = async (
  req: express.Request,
  res: express.Response
): Promise<void> => {
  try {
    const organization = await getOrganizationData(req.params.id);
    res
      .status(200)
      .json({ message: SUCCESS_MESSAGES.DATA_FOUND, data: organization });
  } catch (error) {
    throw new AppError(ERROR_MESSAGES.NOT_FOUND, 404);
  }
};
export const updateOrganization = async (
  req: express.Request,
  res: express.Response
): Promise<void> => {
  try {
    const updates = req.body;
    const organization = await updateOrganizationData(req.params.id, updates);
    res
      .status(200)
      .json({ message: SUCCESS_MESSAGES.ORG_UPDATE, data: organization });
  } catch (error) {
    throw new AppError(ERROR_MESSAGES.UPDATE_ADMIN_ERROR, 404);
  }
};
export const deleteOrganization = async (
  req: express.Request,
  res: express.Response
): Promise<void> => {
  try {
    const organization = await User.findByIdAndDelete(req.params.id);
    if (!organization) {
      res.status(404).json({ message: ERROR_MESSAGES.ORG_NOT_FOUND });
      return;
    }
    res.status(200).json({ message: SUCCESS_MESSAGES.ORG_DELETED });
  } catch (error) {
    throw new AppError(ERROR_MESSAGES.DELETE_USER_ERROR, 500);
  }
};
export const uploadLogo = async (
  req: AuthenticatedRequest,
  res: any
): Promise<any> => {
  try {
    const orgId = req.user.userId;
    const filePath = req.file?.path;
    if (!filePath) {
      throw new AppError(ERROR_MESSAGES.LOGO_NOT_UPLOADED, 400);
    }
    const organization = await uploadLogoService(orgId, filePath);
    res.status(200).json({
      message: SUCCESS_MESSAGES.LOGO_UPLOADED,
      organization,
    });
  } catch (error) {
    throw new AppError(ERROR_MESSAGES.LOGO_UPLOAD_FAILED, 500);
  }
};
export const deleteLogo = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const orgId = (req as AuthenticatedRequest).user?.userId;
    const organization = await deleteLogoService(orgId);
    res.status(200).json({
      message: SUCCESS_MESSAGES.LOGO_DELETED,
      organization,
    });
  } catch (error) {
    throw new AppError(ERROR_MESSAGES.LOGO_NOT_DELETE, 500);
  }
};

export const createUserProfile = async (
  req: AuthenticatedRequest,
  res: any
): Promise<void> => {
  try {
    const result = await createProfileService(req);

    res.status(result.status ? 201 : 409).json(result);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: false,
      message: ERROR_MESSAGES.CREATE_EMPLOYEE_FAILED,
      timestamp: new Date(),
    });
  }
};
