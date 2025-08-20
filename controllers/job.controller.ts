import { Request, Response } from "express";
import * as jobService from "../services/job.service";
import { ERROR_MESSAGES } from "../constants/errorMessage";
import { SUCCESS_MESSAGES } from "../constants/successmessage";
import { AppError } from "../utils/helpers/ global.error.handler";
import { timeStamp } from "node:console";
export const create = async (req: Request, res: any) => {
  try {
    const { title, location, description, applyLink } = req.body;
    if (!title || !location || !description || !applyLink) {
      throw new AppError(ERROR_MESSAGES.CREATE_JOB_FAILED, 400);
    }
    const newJob = await jobService.createJob({
      title,
      location,
      description,
      applyLink,
    });
    if (!newJob.status) {
      return res.status(400).json(newJob);
    }
    res.status(201).json({
      status: true,
      message: SUCCESS_MESSAGES.JOB_CREATED,
      timestamp: new Date(),
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      message: ERROR_MESSAGES.CREATE_JOB_FAILED,
      timestamp: new Date(),
    });
  }
};
export const getAll = async (req: Request, res: Response) => {
  try {
    const limit = parseInt(req.query.limit as string);
    const page = parseInt(req.query.page as string);
    const { jobs, totalPages } = await jobService.getAllJobs(limit, page);
    if (!jobs) {
      res.status(404).json({
        status: false,
        message: ERROR_MESSAGES.JOB_NOT_FOUND,
        timestamp: new Date(),
      });
    }
    res.status(200).json({
      status: true,
      message: SUCCESS_MESSAGES.JOB_FETCHED,
      timestamp: new Date(),
      data: { data: jobs, totalPages },
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      message: ERROR_MESSAGES.FETCH_JOBS_FAILED,
      timestamp: new Date(),
    });
  }
};
export const getById = async (req: Request, res: Response) => {
  try {
    const job = await jobService.getJobById(req.params.id);
    if (!job) {
      res.status(404).json({
        status: false,
        message: ERROR_MESSAGES.JOB_NOT_FOUND,
        timestamp: new Date(),
      });
    }
    res.status(200).json({
      status: true,
      message: SUCCESS_MESSAGES.JOB_FETCHED,
      timestamp: new Date(),
      data: job,
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      message: ERROR_MESSAGES.JOB_NOT_FOUND,
      timestamp: new Date(),
    });
  }
};
export const update = async (req: Request, res: Response) => {
  try {
    const updatedJob = await jobService.updateJob(req.params.id, req.body);
    if (!updatedJob) {
      res.status(404).json({
        status: false,
        message: ERROR_MESSAGES.JOB_NOT_FOUND,
        timestamp: new Date(),
      });
    }
    res.status(200).json({
      status: true,
      message: SUCCESS_MESSAGES.JOB_UPDATED,
      timestamp: new Date(),
      data: updatedJob,
    });
  } catch (error) {
    res.status(400).json({
      status: false,
      message: ERROR_MESSAGES.UPDATE_JOB_FAILED,
      timestamp: new Date(),
    });
  }
};
export const remove = async (req: Request, res: Response) => {
  try {
    const deletedJob = await jobService.deleteJob(req.params.id);
    if (!deletedJob) {
      res.status(400).json({
        status: false,
        message: ERROR_MESSAGES.JOB_NOT_FOUND,
        timestamp: new Date(),
      });
    }
    res.status(200).json({
      status: true,
      message: SUCCESS_MESSAGES.JOB_DELETED,
      timestamp: new Date(),
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      message: ERROR_MESSAGES.DELETE_JOB_FAILED,
      timestamp: new Date(),
    });
  }
};
export const getCareerContent = async (req: Request, res: Response) => {
  try {
    const highlights = [
      {
        title: "Change The World",
        heading: "Life is Too short to do medicore work",
        description:
          "Most people die never realizing they lived a life doing mediocre work. If you aren’t one among them and need a purpose and meaning to what you do, you will find company at Keka. We do our best to make your job feel inspired, enthused and is something that you would look forward to doing every day, something that would push you out of your bed...",
        image:
          "https://res.cloudinary.com/dxh0s4cnr/image/upload/v1746703136/posts/tbspr7kqdfnsx0nxon7h.jpg",
        alt: "team",
      },
      {
        title: "Be Inspired",
        heading: "Work with purpose and passion",
        description:
          "At Keka, every line of code and idea shared contributes to something meaningful. We create a space where inspiration drives performance and teams thrive on purpose.",
        image:
          "https://res.cloudinary.com/dxh0s4cnr/image/upload/v1746703177/posts/u3dubzjarrzzynerqg64.jpg",
        alt: "inspired-team",
      },
    ];
    res.status(200).json({
      status: true,
      message: SUCCESS_MESSAGES.CAREER_PAGE_DATA,
      timestamp: new Date(),
      data: highlights,
    });
  } catch (error) {
    res.status(400).json({
      status: false,
      message: ERROR_MESSAGES.INTERNAL_ERROR,
      timestamp: new Date(),
    });
  }
};
