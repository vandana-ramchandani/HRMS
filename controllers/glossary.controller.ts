import { Request, Response } from "express";
import { AppError } from "../utils/helpers/ global.error.handler";
import { ERROR_MESSAGES } from "../constants/errorMessage";
import { SUCCESS_MESSAGES } from "../constants/successmessage";
import {
  updateGlossaryData,
  deleteGlossaryData,
  createGlossaryService,
  getGlossaryService,
} from "../services/glossary.service";
import { timeStamp } from "console";

export const createGlossary = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { term, definition } = req.body;
    const newGlossary = await createGlossaryService(term, definition);
    res.status(201).json({
      status: true,
      message: SUCCESS_MESSAGES.GLOSSARY_CREATED,
      timeStamp: new Date(),
      data: newGlossary,
    });
  } catch (error) {
    res.status(201).json({
      status: false,
      message: ERROR_MESSAGES.GLOSSARY_NOT_CREATED,
      timeStamp: new Date(),
    });
  }
};

export const getGlossary = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const groupedGlossary = await getGlossaryService();

    res.status(200).json({
      status: true,
      message: SUCCESS_MESSAGES.GLOSSARY_FTETCHED,
      timeStamp: new Date(),
      data: groupedGlossary,
    });
  } catch (error) {
    res.status(201).json({
      status: false,
      message: ERROR_MESSAGES.GLOSSARY_NOT_FETCHED,
      timeStamp: new Date(),
    });
  }
};

export const updateGlossary = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { term, definition } = req.body;
    const id = req.params.id;
    if (!term && !definition) {
      res.status(400).json({
        status: false,
        message: ERROR_MESSAGES.GLOSSARY_MISSING_FIELD,
        timestamp: new Date(),
      });
    }
    const updatedGlossary = await updateGlossaryData(id, term, definition);
    res.status(200).json({
      status: true,
      message: SUCCESS_MESSAGES.GLOSSARY_UPDATED,
      timeStamp: new Date(),
      data: updatedGlossary,
    });
    return;
  } catch (error) {
    throw new AppError(ERROR_MESSAGES.DATA_NOT_FOUND, 404);
  }
};

export const deleteGlossary = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;
    const deletedGlossary = await deleteGlossaryData(id);
    if (!deletedGlossary) {
      res.status(404).json({
        status: false,
        message: "Glossary not found.",
        timestamp: new Date(),
      });
      return;
    }
    res.status(200).json({
      status: true,
      message: SUCCESS_MESSAGES.GLOSSARY_DELETED,
      timeStamp: new Date(),
    });
  } catch (error) {
    res.status(400).json({
      status: false,
      message: "Glossary could not be deleted.",
      timestamp: new Date(),
    });
  }
};
