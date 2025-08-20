import express, { Request, Response } from "express";
import { v2 as cloudinary } from "cloudinary";
import { ERROR_MESSAGES } from "../constants/errorMessage";
import { SUCCESS_MESSAGES } from "../constants/successmessage";
import {
  fetchById,
  createAnnouncementService,
  filterAnnouncementsService,
  updateAnnouncementService,
} from "../services/announcement.service";
import Announcement from "../models/announcement.model";
import { uploadToCloudinary } from "../config/cloudinary.config";
import { AuthenticatedRequest } from "../utils/helpers/authenticated.request";

cloudinary.config({
  cloudinary_url: process.env.CLOUDINARY_URL,
});

export const createAnnouncement = async (
  req: AuthenticatedRequest,
  res: any
): Promise<any> => {
  try {
    const { title, message, type, status } = req.body;
    const authorName = req.user?.name;
    const authorId = req.user?.userId.toString();
    const photoUrl = req.file?.path;

    if (!authorName) {
      return res.status(403).json({
        status: false,
        message: "Unauthorized: User information is missing.",
        timestamp: new Date(),
      });
    }

    const announcement = await createAnnouncementService({
      title,
      message,
      author: authorName,
      authorId: authorId,
      photo: photoUrl,
      type,
      status,
    });

    return res.status(201).json({
      status: true,
      message: SUCCESS_MESSAGES.ANN_CREATED,
      timestamp: new Date(),
      data: announcement,
    });
  } catch (error) {
    res.status(400).json({
      status: false,
      message: ERROR_MESSAGES.ANN_NOT_CREATED,
      timestamp: new Date(),
    });
    return;
  }
};

export const getAnnouncement = async (
  req: express.Request,
  res: express.Response
): Promise<any> => {
  try {
    const announcement = await filterAnnouncementsService(req.query);

    res.status(200).json({
      status: true,
      message: SUCCESS_MESSAGES.ANN_FTECHED,
      timestamp: new Date(),
      data: announcement,
    });
    return;
  } catch (error) {
    return res.status(400).json({
      status: false,
      message: ERROR_MESSAGES.FETCH_ANN_ERROR,
      timestamp: new Date(),
    });
  }
};

export const updateAnnouncement = async (
  req: AuthenticatedRequest,
  res: any
): Promise<any> => {
  const { id } = req.params;
  const userId = req.user.userId.toString();
  const updateData = req.body;

  if (req.file && req.file.path) {
    updateData.photo = req.file.path;
  }

  const validFields = ["title", "message", "type", "status", "photo"];

  const updateField = validFields.some((field) => field in updateData);

  if (!updateField) {
    return res.status(400).json({
      status: false,
      message: ERROR_MESSAGES.NO_VALID_FIELD,
      timestamp: new Date(),
    });
  }

  try {
    const announcement = await Announcement.findById(id);
    const authorId = announcement?.authorId.toString();

    if (authorId !== userId) {
      return res.status(403).json({
        status: false,
        message: ERROR_MESSAGES.UNAUTHORIZED_ACTION,
        timestamp: new Date(),
      });
    }
    const updatedAnnouncement = await updateAnnouncementService(id, updateData);
    res.status(200).json({
      status: true,
      message: SUCCESS_MESSAGES.ANN_UPDATED,
      timestamp: new Date(),
      data: updatedAnnouncement,
    });
    return;
  } catch (error) {
    res.status(400).json({
      status: false,
      message: ERROR_MESSAGES.ANN_NOT_UPDATED,
      timestamp: new Date(),
    });
    return;
  }
};

export const deleteAnnouncement = async (
  req: AuthenticatedRequest,
  res: any
): Promise<any> => {
  const { id } = req.params;
  const userId = req.user.userId.toString();

  try {
    const announcement = await Announcement.findById(id);
    const authorId = announcement?.authorId.toString();

    console.log(announcement);
    if (!announcement) {
      res.status(404).json({
        status: false,
        message: ERROR_MESSAGES.ANN_NOT_FOUND,
        timestamp: new Date(),
      });
    }

    if (authorId !== userId) {
      return res.status(403).json({
        status: false,
        message: ERROR_MESSAGES.UNAUTHORIZED_ACTION,
        timestamp: new Date(),
      });
    }
    await Announcement.findByIdAndDelete(id);
    res.status(200).json({
      status: true,
      message: SUCCESS_MESSAGES.ANN_DELETED,
      timestamp: new Date(),
    });
    return;
  } catch (error) {
    res.status(400).json({
      status: false,
      message: ERROR_MESSAGES.DELETE_ANN_ERROR,
      timestamp: new Date(),
    });
    return;
  }
};
