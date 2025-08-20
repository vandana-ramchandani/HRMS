import { ERROR_MESSAGES } from "../constants/errorMessage";
import { Request, Response } from "express";
import {
  createRatingService,
  getRatingService,
} from "../services/rating.service";
import { SUCCESS_MESSAGES } from "../constants/successmessage";

export const createRatingController = async (req: Request, res: Response) => {
  try {
    const { userId, rating, platform } = req.body;
    const newRating = await createRatingService(userId, rating, platform);
    res.status(201).json({
      message: SUCCESS_MESSAGES.RATING_CREATED,
      rating: newRating,
    });
  } catch (error) {
    res.status(500).json({ message: ERROR_MESSAGES.INTERNAL_ERROR });
  }
};
export const getAverageRatingController = async (
  req: Request,
  res: Response
) => {
  try {
    const averageRating = await getRatingService();
    res.status(200).json({
      status: true,
      message: SUCCESS_MESSAGES.TOTAL_RATING,
      timestamp: new Date(),
      data: averageRating,
    });
  } catch (error) {
    res.status(500).json({ message: ERROR_MESSAGES.INTERNAL_ERROR });
  }
};
