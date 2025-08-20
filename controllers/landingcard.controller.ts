import { Request, Response } from "express";
import { ERROR_MESSAGES } from "../constants/errorMessage";
import {
  addLandingCardService,
  getLandingCardService,
  landingCardServie,
} from "../services/landingcard.service";
import { SUCCESS_MESSAGES } from "../constants/successmessage";
import { title } from "process";

export const addLandingCardController = async (req: Request, res: Response) => {
  try {
    const { title, description, amount } = req.body;
    const imageURL = req.file?.path || "";
    const addCard = await addLandingCardService(
      title,
      description,
      imageURL,
      amount
    );
    res.status(201).json({
      message: SUCCESS_MESSAGES.LANDING_CARD_CREATED,
      data: addCard,
    });
  } catch (error: any) {
    console.error("Error in addLandingCardController:", error);
    res.status(500).json({ message: ERROR_MESSAGES.INTERNAL_ERROR });
  }
};

export const getLandingCardController = async (req: Request, res: Response) => {
  try {
    const landingCard = await getLandingCardService();
    if (!landingCard) {
      return res.status(404).json({
        message: ERROR_MESSAGES.LANDING_CARD_NOT_FOUND,
      });
    }
    res.status(200).json({
      message: SUCCESS_MESSAGES.LANDING_CARD_FETCHED,
      data: landingCard,
    });
  } catch (error: any) {
    console.error("Error in getLandingCardController:", error);
    res.status(500).json({ message: ERROR_MESSAGES.INTERNAL_ERROR });
  }
};

export const landingcards = async (req: Request, res: Response) => {
  try {
    const cards = await landingCardServie();
    res.status(200).json({
      status: true,
      message: SUCCESS_MESSAGES.CAREER_PAGE_DATA,
      timestamp: new Date(),
      data: cards,
    });
  } catch (error) {
    res.status(500).json({ message: ERROR_MESSAGES.INTERNAL_ERROR });
  }
};
