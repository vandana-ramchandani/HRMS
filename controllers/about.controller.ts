import { Request, Response, NextFunction } from "express";
import * as userService from "../services/about.service";
import TeamMembers from "../models/team.members.model";
import { SUCCESS_MESSAGES } from "../constants/successmessage";
import aboutKekaModel from "../models/aboutKeka.model";
import { v2 as cloudinary } from "cloudinary";
import { uploadToCloudinary } from "../config/cloudinary.config";
import { timeStamp } from "console";
import { ERROR_MESSAGES } from "../constants/errorMessage";

export const getTeamDetails = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const limit = parseInt(req.query.limit as string);
    const page = parseInt(req.query.page as string);

    const { teamMembers, totalPages } = await userService.getTeamDetailsService(
      limit,
      page
    );

    res.json({
      status: true,
      message: SUCCESS_MESSAGES.TEAM_MEMBER_RETRIEVED,
      timestamp: new Date(),
      data: {
        data: teamMembers,
        totalPages,
      },
    });
  } catch (err: any) {
    if (
      err.message === "Page number must be a positive number" ||
      err.message === "Limit must be a positive number"
    ) {
      res.status(400).json({
        status: false,
        message: err.message,
        timestamp: new Date(),
      });
    } else {
      res.status(400).json({
        status: false,
        message: ERROR_MESSAGES.TEAM_MEMBER_NOT_FOUND,
        timestamp: new Date(),
      });
    }
  }
};

export const getTeamMemberDetails = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { id } = req.params;
    const teamMemberDetails = await userService.getTeamMemberDetails(id);
    if (!teamMemberDetails) {
      res.status(404).json({
        status: false,
        message: ERROR_MESSAGES.TEAM_MEMBER_NOT_FOUND,
        timestamp: new Date(),
      });
      return;
    }
    res.status(200).json({
      status: true,
      message: SUCCESS_MESSAGES.TEAM_MEMBER_RETRIEVED,
      timestamp: new Date(),
      data: teamMemberDetails,
    });
  } catch (err) {
    res.status(400).json({
      status: false,
      message: ERROR_MESSAGES.TEAM_MEMBER_NOT_FOUND,
      timestamp: new Date(),
    });
  }
};

export const addTeamMember = async (
  req: any,
  res: any,
  next: NextFunction
): Promise<void> => {
  try {
    const { name, designation } = req.body;
    const image = req.file ? req.file.path : "NULL";

    const checkTeamMember = await TeamMembers.findOne({
      name: name,
      designation: designation,
      delete_flag: false,
    });
    if (checkTeamMember) {
      res.status(400).json({
        status: false,
        message: SUCCESS_MESSAGES.TEAM_MEMBER_EXISTS,
        timestamp: new Date(),
      });
      return;
    }
    const teamMember = await userService.addTeamMember(
      name,
      designation,
      image
    );
    res.status(201).json({
      status: true,
      message: SUCCESS_MESSAGES.TEAM_MEMBER_ADDED,
      timestamp: new Date(),
    });
  } catch (err) {
    res.status(400).json({
      status: false,
      message: ERROR_MESSAGES.TEAM_MEMBER_NOT_FOUND,
      timestamp: new Date(),
    });
  }
};

export const editTeamMember = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { id } = req.params;
    const { name, designation } = req.body;
    const image = req.file ? req.file.path : null;

    const teamMember = await userService.editTeamMember(
      id,
      name,
      designation,
      image
    );

    res.status(200).json({
      status: true,
      message: SUCCESS_MESSAGES.TEAM_MEMBER_UPDATED,
      timestamp: new Date(),
    });
  } catch (err) {
    res.status(400).json({
      status: false,
      message: ERROR_MESSAGES.TEAM_MEMBER_NOT_FOUND,
      timestamp: new Date(),
    });
  }
};

export const deleteTeamMember = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { id } = req.params;
    const deletemember = await userService.deleteMemberService(id);
    res.status(200).json({
      status: true,
      message: SUCCESS_MESSAGES.TEAM_MEMBER_DELETED,
      timestamp: new Date(),
    });
  } catch (err) {
    res.status(400).json({
      status: false,
      message: ERROR_MESSAGES.TEAM_MEMBER_NOT_FOUND,
      timestamp: new Date(),
    });
  }
};

export const postAboutKeka = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { title, description, subtile } = req.body;

    let imageUrl: string | undefined;
    if (req.file) {
      imageUrl = await uploadToCloudinary(req.file.path, "about_keka");
    }

    const data = await aboutKekaModel.create({
      title,
      description,
      subtile,
      image: imageUrl,
    });
    res.status(201).json({
      status: true,
      message: SUCCESS_MESSAGES.ABOUT_KEKA_POSTED,
      timestamp: new Date(),
    });
  } catch (err) {
    console.log(err)
    res.status(400).json({
      status: false,
      message: ERROR_MESSAGES.DATA_NOT_INSERTED,
      timestamp: new Date(),
    });
  }
};

export const getAboutKeka = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const data = await userService.getAllAboutKeka();
    res.status(200).json({
      status: true,
      message: SUCCESS_MESSAGES.ABOUT_KEKA_RETRIEVED,
      timestamp: new Date(),
      data,
    });
  } catch (err) {
    res.status(400).json({
      status: false,
      message: ERROR_MESSAGES.DATA_NOT_FETCHED,
      timestamp: new Date(),
    });
  }
};

export const getAboutKekaById = async (req: any, res: any) => {
  try {
    const { id } = req.params;
    const data = await userService.getAboutKekaById(id);
    if (!data) {
      return res.status(404).json({
        status: false,
        message: ERROR_MESSAGES.DATA_NOT_FOUND,
        timestamp: new Date(),
      });
    }
    res.status(200).json({
      status: true,
      message: SUCCESS_MESSAGES.ABOUT_KEKA_RETRIEVED,
      timestamp: new Date(),
      data,
    });
  } catch (err) {
    res.status(400).json({
      status: false,
      message: ERROR_MESSAGES.DATA_NOT_FETCHED,
      timestamp: new Date(),
    });
  }
};

export const updateAboutKeka = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;
    const { title, description, subtile } = req.body;
    const image = req.file ? req.file.path : undefined;

    const updateData: any = { title, description, subtile };
    if (image) updateData.image = image;

    const updated = await userService.updateAboutKekaById(id, updateData);

    if (!updated) {
      res.status(404).json({
        status: false,
        message: ERROR_MESSAGES.DATA_NOT_UPDATED,
        timestamp: new Date(),
      });
      return;
    }

    res.status(200).json({
      status: true,
      message: SUCCESS_MESSAGES.ABOUT_KEKA_UPDATED,
      timestamp: new Date(),
      data: updated,
    });
  } catch (err) {
    res.status(400).json({
      status: false,
      message: ERROR_MESSAGES.DATA_NOT_UPDATED,
      timestamp: new Date(),
    });
  }
};

export const deleteAboutKeka = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;
    const deleted = await userService.deleteAboutKekaById(id);

    if (!deleted) {
      res.status(404).json({
        status: false,
        message: ERROR_MESSAGES.ABOUT_KEKA_NOT_FOUND,
        timestamp: new Date(),
      });
      return;
    }

    res.status(200).json({
      status: true,
      message: SUCCESS_MESSAGES.ABOUT_KEKA_DELETED,
      timestamp: new Date(),
    });
  } catch (err) {
    res.status(400).json({
      status: false,
      message: ERROR_MESSAGES.ABOUT_KEKA_NOT_DELETED,
      timestamp: new Date(),
    });
  }
};
