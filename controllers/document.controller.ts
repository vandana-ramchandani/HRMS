import { Request, Response } from "express";
import {
  uploadPDFService,
  getAllPDFsService,
  editPDFService,
  deletePDFService,
  getPDFByIdService,
} from "../services/document.service";
import { AppError } from "../utils/helpers/ global.error.handler";
import { ERROR_MESSAGES } from "../constants/errorMessage";
import { SUCCESS_MESSAGES } from "../constants/successmessage";

export const uploadPDF = async (req: any, res: Response): Promise<void> => {
  try {
    const {
      name,
      title,
      documentNumber,
      address,
      dob,
      gender,
      parentName,
      issuedOn,
    } = req.body;
    const file = req.file;
    const { userId } = req.user;
    if (!file) {
      throw new AppError(ERROR_MESSAGES.DOCUMENT_NOT_FOUND, 400);
    } else if (
      !title ||
      !documentNumber ||
      !address ||
      !dob ||
      !gender ||
      !parentName
    ) {
      throw new AppError(ERROR_MESSAGES.ALL_FIELDS_REQUIRED, 400);
    }
    const pdf = await uploadPDFService(
      file,
      title,
      userId,
      name,
      documentNumber,
      address,
      dob,
      gender,
      parentName,
      issuedOn
    );

    res.status(201).json({
      status: true,
      message: SUCCESS_MESSAGES.DOCUMENT_UPLOADED,
      timestamp: new Date().toISOString(),
      data: pdf,
    });
  } catch (error) {
    console.log(error);
    throw new AppError(ERROR_MESSAGES.DOCUMENT_NOT_UPLOADED, 500);
  }
};

export const getAllPDFs = async (req: any, res: Response): Promise<void> => {
  try {
    const userId = req.user?.userId;
    const pdfs = await getAllPDFsService(userId);

    res.status(200).json({
      status: true,
      message: SUCCESS_MESSAGES.DOCUMENT_FETCHED,
      timestamp: new Date().toISOString(),
      data: pdfs,
    });
  } catch (error) {
    throw new AppError(ERROR_MESSAGES.DOCUMENT_NOT_FETCHED, 500);
  }
};

export const getPDFById = async (req: any, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const userId = req.user?.userId;

    const pdf = await getPDFByIdService(id, userId);

    res.status(200).json({
      status: true,
      message: SUCCESS_MESSAGES.DOCUMENT_FETCHED,
      timestamp: new Date().toISOString(),
      data: pdf,
    });
  } catch (error: any) {
    res.status(error.statusCode || 500).json({
      status: false,
      message: ERROR_MESSAGES.DOCUMENT_NOT_FETCHED,
    });
  }
};

export const editPDF = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const {
      title,
      userId,
      name,
      documentNumber,
      address,
      dob,
      gender,
      parentName,
      issuedOn,
    } = req.body;

    const file = req.file; // could be undefined if not uploaded

    const updatedPDF = await editPDFService(
      id,
      title,
      file, // pass file as optional
      userId,
      name,
      documentNumber,
      address,
      dob,
      gender,
      parentName,
      issuedOn
    );

    res.status(200).json({
      status: true,
      message: SUCCESS_MESSAGES.DOCUMENT_UPDATED,
      timestamp: new Date().toISOString(),
      data: updatedPDF,
    });
  } catch (error: any) {
    console.error("Edit PDF error:", error);
    res.status(error.statusCode || 500).json({
      status: false,
      message: error.message || ERROR_MESSAGES.DOCUMENT_NOT_EDITED,
      timestamp: new Date().toISOString(),
    });
  }
};


export const deletePDF = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;

    await deletePDFService(id);

    res.status(200).json({
      status: true,
      message: SUCCESS_MESSAGES.DOCUMENT_DELETED,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    throw new AppError(ERROR_MESSAGES.DOCUMENT_NOT_DELETED, 400);
  }
};
