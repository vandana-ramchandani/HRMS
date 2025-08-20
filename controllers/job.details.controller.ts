import { Request, Response } from "express";
import { ERROR_MESSAGES } from "../constants/errorMessage";
import {
  addJobdetailsService,
  deleteJobDetailsService,
  editJobDetailsService,
  getJobDetailsService,
} from "../services/job.details.service";
import JobdetailsModel from "../models/job.details.model";
import { SUCCESS_MESSAGES } from "../constants/successmessage";

export const addJobdetails = async (req: Request, res: any) => {
  try {
    const checkUser = await JobdetailsModel.find({ userId: req.body.userId });

    if (checkUser.length >= 1) {
      return res.status(406).json({
        status: false,
        message: ERROR_MESSAGES.JOB_DETAILS_ALREADY_EXISTS,
        timestamp: new Date(),
      });
    }
    const jobDetails = await addJobdetailsService(req.body);
    res.status(201).json({
      status: true,
      message: SUCCESS_MESSAGES.JOB_DETAILS_ADDED,
      timestamp: new Date(),
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      message: ERROR_MESSAGES.INTERNAL_ERROR,
      timestamp: new Date(),
    });
  }
};

export const getJobDetails = async (req: Request, res: any) => {
  try {
    const { userId } = req.params;
    const jobDetails = await getJobDetailsService(userId);

    if (!jobDetails) {
      return res
        .status(404)
        .json({ status: false, message: ERROR_MESSAGES.JOB_DETAILS_NOT_FOUND });
    }

    res.status(200).json({
      status: true,
      message: SUCCESS_MESSAGES.JOb_DETAILS_RETRIEVED,
      timestamp: new Date(),
      data: jobDetails,
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      message: ERROR_MESSAGES.INTERNAL_ERROR,
      timestamp: new Date(),
    });
  }
};

export const editJobDetails = async (req: Request, res: any) => {
  try {
    const updatedJobDetails = await editJobDetailsService(
      req.params.userId,
      req.body
    );

    if (!updatedJobDetails) {
      return res.status(404).json({
        status: false,
        message: ERROR_MESSAGES.JOB_DETAILS_NOT_FOUND,
        timestamp: new Date(),
      });
    }

    res.status(200).json({
      status: true,
      message: SUCCESS_MESSAGES.JOB_DETAILS_UPDATED,
      timestamp: new Date(),
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      message: ERROR_MESSAGES.INTERNAL_ERROR,
      timestamp: new Date(),
    });
  }
};

export const deleteJobDetails = async (req: Request, res: any) => {
  try {
    const { userId } = req.params;
    const deletedJobDetails = await deleteJobDetailsService(userId);
    if (!deletedJobDetails) {
      return res.status(404).json({
        status: false,
        message: ERROR_MESSAGES.JOB_DETAILS_NOT_FOUND,
        timestamp: new Date(),
      });
    }
    res.status(200).json({
      status: true,
      message: SUCCESS_MESSAGES.JOB_DETAILS_DELETED,
      timestamp: new Date(),
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      message: ERROR_MESSAGES.INTERNAL_ERROR,
      timestamp: new Date(),
    });
  }
};
