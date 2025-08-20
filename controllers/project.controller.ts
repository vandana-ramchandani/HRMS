import { Request, Response } from "express";
import { AuthenticatedRequest } from "../utils/helpers/authenticated.request";
import {
  addProjectService,
  getProjectService,
} from "../services/project.service";
import { SUCCESS_MESSAGES } from "../constants/successmessage";

export const addProject = async (
  req: AuthenticatedRequest,
  res: any
): Promise<void> => {
  try {
    const { userId } = req.user;
    const {
      projectName,
      clientName,
      billingType,
      startDate,
      endDate,
      projectManager,
    } = req.body;
    const result = await addProjectService(
      userId,
      projectName,
      clientName,
      billingType,
      startDate,
      endDate,
      projectManager
    );
    res.status(201).json({
      status: true,
      message: SUCCESS_MESSAGES.PROJECT_ADDED,
      timestamp: new Date(),
    });
  } catch (error: any) {
    res
      .status(400)
      .json({ status: false, message: error.message, timestamp: new Date() });
  }
};

export const getProjectController = async (
  req: AuthenticatedRequest,
  res: any
): Promise<void> => {
  try {
    const { userId } = req.user;
    const page = parseInt(req.query.page as string);
    const limit = parseInt(req.query.limit as string);
    const status = req.query.status as string;
    const billingType = req.query.billingType as string;
    const search = req.query.search as string;
    const { projects, totalPages } = await getProjectService(
      page,
      limit,
      userId,
      status,
      billingType,
      search
    );
    res.status(200).json({
      status: true,
      message: SUCCESS_MESSAGES.PROJECT_FETCHED,
      data: { data: projects, totalPages },
      timestamp: new Date(),
    });
  } catch (error: any) {
    res
      .status(400)
      .json({ status: false, message: error.message, timestamp: new Date() });
  }
};
