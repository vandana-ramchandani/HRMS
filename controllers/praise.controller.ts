import { Request, Response } from "express";
import {
  createPraise,
  deletePraiseService,
  getAllPraisesService,
  getPraiseByIdService,
  updatePraiseService,
} from "../services/praise.service";
import { SUCCESS_MESSAGES } from "../constants/successmessage";

export const createPraiseController = async (req: Request, res: Response) => {
  try {
    const { userId, role, orgId: userOrgId } = req.user;
    const { mentions, description, badgeId } = req.body;
    let orgId = "";
    if (role == "organisation") {
      orgId += userId;
    }
    if (role == "employee") {
      orgId += userOrgId;
    }
    console.log(orgId);
    // console.log(mentions, "==<<<<mentions");
    const parsedMentions = JSON.parse(mentions);
    // console.log(parsedMentions, "==<<<<parsedMentions");

    const attachments =
      (req.files as Express.Multer.File[])?.map((file) => file.path) || [];

    const newPraise = await createPraise(
      orgId,
      parsedMentions,
      description,
      badgeId,
      attachments
    );
    res.status(201).json({
      status: true,
      message: SUCCESS_MESSAGES.PRAISE_POSTED,
      timestamp: new Date(),
    });
  } catch (error: any) {
    res
      .status(400)
      .json({ status: false, message: error.message, timestamp: new Date() });
  }
};

export const getAllPraise = async (req: Request, res: any) => {
  try {
    const { userId, role, orgId: userOrgId } = req.user;
    const limit = parseInt(req.query.limit as string);
    const page = parseInt(req.query.page as string);
    let orgId = "";
    if (role == "organisation") {
      orgId += userId;
    }
    if (role == "employee") {
      orgId += userOrgId;
    }

    const { praises, totalPages } = await getAllPraisesService(
      limit,
      page,
      orgId
    );
    res.status(200).json({
      status: true,
      message: SUCCESS_MESSAGES.PRAISE_FETCHED,
      timestamp: new Date(),
      data: { data: praises, totalPages },
    });
  } catch (error: any) {
    res
      .status(400)
      .json({ status: false, message: error.message, timestamp: new Date() });
  }
};

export const updatePraiseController = async (req: Request, res: Response) => {
  try {
    const { userId, orgId: userOrgId } = req.user;
    const { id } = req.params;
    const { mentions, description, badgeId } = req.body;
    let orgId = "";
    if (req.user.role == "organisation") {
      orgId += userId;
    }
    if (req.user.role == "employee") {
      orgId += userOrgId;
    }
    console.log(orgId);
        const parsedMentions = JSON.parse(mentions);

    const result = await updatePraiseService(
      id,
      parsedMentions,
      description,
      badgeId
    );
    res.status(200).json({
      status: true,
      message: SUCCESS_MESSAGES.PRAISE_UPDATED,
      timestamp: new Date()
    });
  } catch (error: any) {
    res
      .status(400)
      .json({ status: false, message: error.message, timestamp: new Date() });
  }
};

export const deletePraiseController = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const result = await deletePraiseService(id);
    res.status(200).json({
      status: true,
      message: SUCCESS_MESSAGES.PRAISE_DELETED,
      timestamp: new Date()
    });
  } catch (error: any) {
    res
      .status(400)
      .json({ status: false, message: error.message, timestamp: new Date() });
  }
}

export const getPraiseByIdController = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const praise = await getPraiseByIdService(id);
    res.status(200).json({
      status: true,
      message: SUCCESS_MESSAGES.PRAISE_FETCHED,
      timestamp: new Date(),
      data: praise,
    });
  } catch (error: any) {
    res
      .status(400)
      .json({ status: false, message: error.message, timestamp: new Date() });
  }
}