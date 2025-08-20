import { Request, Response } from "express";
import { ERROR_MESSAGES } from "../constants/errorMessage";
import {
  assetsRecievedService,
  assetsResponseServie,
  assetsReturnService,
  assignAssetService,
  deleteAssetService,
  editAssetsServie,
  getAllAssetsByUser,
  getAllAssetsService,
  getAssetByIdService,
  getAssetService,
  getRequestService,
} from "../services/assets.service";
import { SUCCESS_MESSAGES } from "../constants/successmessage";
import { AuthenticatedRequest } from "../utils/helpers/authenticated.request";

export const assignAsset = async (
  req: AuthenticatedRequest,
  res: any
): Promise<void> => {
  try {
    const { userId, orgId } = req.user;
    const { requestItem } = req.body;

    const assignresult = await assignAssetService(userId, orgId, requestItem);
    res.status(201).json({
      status: true,
      message: SUCCESS_MESSAGES.ASSETS_REQUSTED_SEND,
      timestamp: new Date(),
    });
  } catch (error: any) {
    res
      .status(400)
      .json({ stauts: false, message: error.message, timestamp: new Date() });
  }
};

export const assetsResponse = async (req: Request, res: any): Promise<void> => {
  try {
    const { id } = req.params;
    const { requestStatus } = req.body;

    const changeStatus = await assetsResponseServie(id, requestStatus);

    const message =
      requestStatus === "approved"
        ? SUCCESS_MESSAGES.ASSETS_APPROVED_REQUEST
        : requestStatus === "rejected"
        ? SUCCESS_MESSAGES.ASSETS_REJECTED_REQUEST
        : SUCCESS_MESSAGES.ASSETS_STATUS_UPDATED;

    res.status(200).json({
      status: true,
      message,
      timestamp: new Date(),
    });
  } catch (error: any) {
    res
      .status(400)
      .json({ stauts: false, message: error.message, timestamp: new Date() });
  }
};

export const assestRecieved = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;
    const result = await assetsRecievedService(id);

    if (!result.status) {
      res.status(400).json(result);
      return;
    }

    res.status(200).json({
      status: true,
      message: SUCCESS_MESSAGES.ASSETS_STATUS_UPDATED,
      timestamp: new Date(),
    });
  } catch (error: any) {
    res.status(500).json({
      status: false,
      message: error.message || "Internal server error",
      timestamp: new Date(),
    });
  }
};

export const assestReturn = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;
    const changeStatus = await assetsReturnService(id);
    if (!changeStatus) {
      res.status(404).json({ message: ERROR_MESSAGES.DATA_NOT_FOUND });
    }
    res.status(200).json({
      status: true,
      message: SUCCESS_MESSAGES.ASSETS_STATUS_UPDATED,
      timestamp: new Date(),
    });
  } catch (error: any) {
    res
      .status(400)
      .json({ stauts: false, message: error.message, timestamp: new Date() });
  }
};

export const getAssetsRequests = async (
  req: AuthenticatedRequest,
  res: any
): Promise<void> => {
  try {
    const { userId } = req.user;
    const page = parseInt(req.query.page as string);
    const limit = parseInt(req.query.limit as string);
    const search = req.query.search as string;
    console.log(userId);
    const { requestResult, totalPages } = await getRequestService(
      userId,
      page,
      limit,
      search
    );

    res.status(200).json({
      status: true,
      message: SUCCESS_MESSAGES.ASSETS_REQUESTS,
      timestamp: new Date(),
      data: { data: requestResult, totalPages },
    });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    res.status(400).json({
      status: false,
      message: errorMessage,
      timestamp: new Date(),
    });
  }
};

export const getAssignedAssets = async (
  req: AuthenticatedRequest,
  res: any
): Promise<void> => {
  try {
    const { userId } = req.user;
    const page = parseInt(req.query.page as string);
    const limit = parseInt(req.query.limit as string);
    const search = req.query.search as string;

    const { assetsResult, totalPages } = await getAssetService(
      userId,
      page,
      limit,
      search
    );
    if (!assetsResult) {
      res.status(404).json({ message: ERROR_MESSAGES.DATA_NOT_FOUND });
    }
    res.status(200).json({
      status: true,
      message: SUCCESS_MESSAGES.ASSIGNED_ASSETS,
      timestamp: new Date(),
      data: { data: assetsResult, totalPages },
    });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    res.status(400).json({
      status: false,
      message: errorMessage,
      timestamp: new Date(),
    });
  }
};

export const getAllAssets = async (req: AuthenticatedRequest, res: any) => {
  try {
    const { userId } = req.user;
    const page = parseInt(req.query.page as string);
    const limit = parseInt(req.query.limit as string);
    const status = req.query.status as string;
    const search = req.query.search as string;
    const { assetsResult, totalPages } = await getAllAssetsService(
      userId,
      page,
      limit,
      status,
      search
    );
    res.status(200).json({
      status: true,
      message: SUCCESS_MESSAGES.ASSETS_LIST,
      timestamp: new Date(),
      data: { data: assetsResult, totalPages },
    });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    res.status(400).json({
      status: false,
      message: errorMessage,
      timestamp: new Date(),
    });
  }
};

export const editAsset = async (
  req: AuthenticatedRequest,
  res: any
): Promise<void> => {
  try {
    const { id } = req.params;
    const { requestItem } = req.body;
    const { userId } = req.user;
    const updatedAsset = await editAssetsServie(id, userId, requestItem);

    if (!updatedAsset) {
      res.status(404).json({ message: ERROR_MESSAGES.DATA_NOT_FOUND });
      return;
    }

    res.status(200).json({
      status: true,
      message: SUCCESS_MESSAGES.ASSETS_UPDATED,
      data: updatedAsset,
      timestamp: new Date(),
    });
  } catch (error: any) {
    res
      .status(400)
      .json({ status: false, message: error.message, timestamp: new Date() });
  }
};

export const getAssetById = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;
    const asset = await getAssetByIdService(id);

    if (!asset) {
      res.status(404).json({ message: ERROR_MESSAGES.DATA_NOT_FOUND });
      return;
    }

    res.status(200).json({
      status: true,
      message: SUCCESS_MESSAGES.ASSETS_FETCHED,
      data: asset,
      timestamp: new Date(),
    });
  } catch (error: any) {
    res
      .status(400)
      .json({ status: false, message: error.message, timestamp: new Date() });
  }
};
export const deleteAsset = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;

    const deletedAsset = await deleteAssetService(id);

    if (!deletedAsset) {
      res.status(404).json({
        status: false,
        message: ERROR_MESSAGES.DATA_NOT_FOUND,
        timestamp: new Date(),
      });
      return;
    }

    res.status(200).json({
      status: true,
      message: SUCCESS_MESSAGES.ASSETS_DELETED,
      timestamp: new Date(),
    });
  } catch (error: any) {
    res.status(400).json({
      status: false,
      message: error.message || ERROR_MESSAGES.DATA_NOT_DELETED,
      timestamp: new Date(),
    });
  }
};
export const getAssetByUser = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { userId } = req.params;
    const page = parseInt(req.query.page as string);
    const limit = parseInt(req.query.limit as string);
    const search = req.query.search as string;
    const status = req.query.status as string;
    const { assetsResult, totalPages } = await getAllAssetsByUser(
      userId,
      page,
      limit,
      status,
      search
    );

    res.status(200).json({
      status: true,
      message: SUCCESS_MESSAGES.ASSETS_LIST,
      timestamp: new Date(),
      data: { data: assetsResult, totalPages },
    });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    res.status(400).json({
      status: false,
      message: errorMessage,
      timestamp: new Date(),
    });
  }
};
