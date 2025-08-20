import { Request } from "express";
import * as badgeService from "../services/badge.service";
import { SUCCESS_MESSAGES } from "../constants/successmessage";
import { date } from "joi";
import { ERROR_MESSAGES } from "../constants/errorMessage";

export const addBadge = async (req: Request, res: any) => {
  try {
    const { userId } = req.user;
    const orgId = userId;
    const { title, description } = req.body;
    const image = req.file?.path || "null";
    console.log(image);
    const badge = await badgeService.createBadge(
      orgId,
      title,
      description,
      image
    );
    res.status(201).json({
      success: true,
      message: SUCCESS_MESSAGES.BADGE_CREATED,
      timestamp: new Date(),
    });
  } catch (error) {
    res.status(400).json({
      status: false,
      message: ERROR_MESSAGES.INTERNAL_ERROR,
      timestamp: new Date(),
    });
  }
};

export const getBadges = async (_req: Request, res: any) => {
  try {
    const badges = await badgeService.getAllBadges();
    res
      .status(200)
      .json({
        status: true,
        message: SUCCESS_MESSAGES.BADGE_FETHED,
        timestamp: new Date(),
        data: badges,
      });
  } catch (error: any) {
    res
      .status(400)
      .json({ status: false, message: error.message, timestamp: new Date() });
  }
};

export const getBadge = async (req: Request, res: any) => {
  try {
    const badge = await badgeService.getBadgeById(req.params.id);
    if (!badge) return res.status(404).json({ message: "Badge not found" });
    res
      .status(200)
      .json({
        status: true,
        message: SUCCESS_MESSAGES.BADGE_FETHED,
        timestamp: new Date(),
        data: badge,
      });
  } catch (error: any) {
    res
      .status(400)
      .json({ status: false, message: error.message, timestamp: new Date() });
  }
};

export const editBadge = async (req: Request, res: any) => {
  try {
    const badge = await badgeService.updateBadge(req.params.id, req.body);
    if (!badge) return res.status(404).json({ message: "Badge not found" });
    res
      .status(200)
      .json({ status: true, message: "Badge updated", timestamp: new Date() });
  } catch (error: any) {
    res
      .status(400)
      .json({ status: false, message: error.message, timestamp: new Date() });
  }
};

export const removeBadge = async (req: Request, res: any) => {
  try {
    const badge = await badgeService.deleteBadge(req.params.id);
    if (!badge) return res.status(404).json({ message: "Badge not found" });
    res
      .status(200)
      .json({ status: true, message: "Badge deleted", timestamp: new Date() });
  } catch (error: any) {
    res
      .status(400)
      .json({ status: false, message: error.message, timestamp: new Date() });
  }
};
