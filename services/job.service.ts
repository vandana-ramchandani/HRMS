import Job from "../models/job.model";
import { ERROR_MESSAGES } from "../constants/errorMessage";
import { SUCCESS_MESSAGES } from "../constants/successmessage";
import { AppError } from "../utils/helpers/ global.error.handler";
import { Request, Response } from "express";
import { getPaginationParams } from "../utils/helpers/pagination";

export const createJob = async (data: {
  title: string;
  location: string;
  description: string;
  applyLink: string;
}) => {
  try {
    const newJob = new Job(data);
    const job = await newJob.save();
    return {
      status: true,
      message: SUCCESS_MESSAGES.JOB_CREATED,
      timestamp: new Date().toISOString(),
      data: [{ jobid: job._id, jobtitle: job.title }],
    };
  } catch (error) {
    return {
      status: false,
      message: ERROR_MESSAGES.CREATE_JOB_FAILED,
      timestamp: new Date(),
    };
  }
};

export const getAllJobs = async (limit: number, page: number) => {
  try {
    const totalJobs = await Job.countDocuments();
    const totalPages = Math.ceil(totalJobs / limit);
    const { skip, limit: pageSize } = await getPaginationParams(page, limit);
    const jobs = await Job.find().skip(skip).limit(pageSize);

    if (!jobs.length) {
      return {
        status: false,
        message: ERROR_MESSAGES.JOB_NOT_FOUND,
        timestamp: new Date(),
      };
    }
    return { jobs, totalPages };
  } catch (error) {
    return {
      status: false,
      message: ERROR_MESSAGES.FETCH_JOBS_FAILED,
      timestamp: new Date(),
    };
  }
};

export const getJobById = async (id: string) => {
  try {
    const job = await Job.findById(id);
    if (!job) {
      return {
        status: false,
        message: ERROR_MESSAGES.JOB_NOT_FOUND,
        timestamp: new Date(),
      };
    }
    return job;
  } catch (error) {
    return {
      status: false,
      message: ERROR_MESSAGES.FETCH_JOBS_FAILED,
      timestamp: new Date(),
    };
  }
};

export const updateJob = async (
  id: string,
  data: {
    title?: string;
    location?: string;
    description?: string;
    applyLink?: string;
  }
) => {
  try {
    const existingJob = await Job.findById(id);
    if (!existingJob) {
      throw new AppError(ERROR_MESSAGES.JOB_NOT_FOUND, 404);
    }

    const updatedJob = await Job.findByIdAndUpdate(id, data, { new: true });
    if (!updatedJob) {
      throw new AppError(ERROR_MESSAGES.JOB_NOT_FOUND, 404);
    }
    return updatedJob;
  } catch (error) {
    return {
      status: false,
      message: ERROR_MESSAGES.UPDATE_JOB_FAILED,
      timestamp: new Date(),
    };
  }
};

export const deleteJob = async (id: string) => {
  try {
    const deletedJob = await Job.findByIdAndDelete(id);
    if (!deletedJob) {
      throw new AppError(ERROR_MESSAGES.JOB_NOT_FOUND, 404);
    }
    return { message: SUCCESS_MESSAGES.JOB_DELETED };
  } catch (error) {
    return {
      status: false,
      message: ERROR_MESSAGES.DELETE_JOB_FAILED,
      timestamp: new Date(),
    };
  }
};
