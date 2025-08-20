import { ERROR_MESSAGES } from "../constants/errorMessage";
import AssetsModel from "../models/assets.model";
import mongoose from "mongoose";
import { getPaginationParams } from "../utils/helpers/pagination";

export const assignAssetService = async (
  userId: string,
  orgId: any,
  requestItem: string
) => {
  try {
    const assignresult = await AssetsModel.create({
      userId,
      orgId,
      requestItem,
    });
  } catch (error: any) {
    throw new Error(ERROR_MESSAGES.ASSIGN_ASSETS_ERROR || error.message);
  }
};

export const assetsResponseServie = async (
  id: string,
  requestStatus: string
) => {
  try {
    const reponseResult = await AssetsModel.findByIdAndUpdate(
      id,
      {
        requestStatus,
      },
      { new: true }
    );
    return reponseResult;
  } catch (error) {
    return {
      status: false,
      message: ERROR_MESSAGES.ASSIGN_ASSETS_ERROR,
      timestamp: new Date(),
    };
  }
};

export const assetsRecievedService = async (id: string) => {
  try {
    const asset = await AssetsModel.findById(id);

    if (!asset || asset.requestStatus !== "approved") {
      return {
        status: false,
        message: ERROR_MESSAGES.ASSET_NOT_APPROVED,
        timestamp: new Date(),
      };
    }

    const responseResult = await AssetsModel.findByIdAndUpdate(
      id,
      {
        IsRecieved: true,
        returnStatus: "not returned",
      },
      { new: true }
    );

    return {
      status: true,
      data: responseResult,
      timestamp: new Date(),
    };
  } catch (error) {
    return {
      status: false,
      message: ERROR_MESSAGES.RECEIVE_ASSET_ERROR,
      timestamp: new Date(),
    };
  }
};


export const assetsReturnService = async (id: string) => {
  try {
    const reponseResult = await AssetsModel.findByIdAndUpdate(
      id,
      {
        returnStatus: "returned",
      },
      { new: true }
    );
    return reponseResult;
  } catch (error) {
    return {
      status: false,
      message: ERROR_MESSAGES.ASSIGN_ASSETS_ERROR,
      timestamp: new Date(),
    };
  }
};

export const getRequestService = async (
  userId: string,
  page: number,
  limit: number,
  search: string
) => {
  try {
    const { skip, limit: pageSize } = await getPaginationParams(page, limit);

    const userID = new mongoose.Types.ObjectId(userId);

    const filter: any = { userId: userID };
    if (search) {
      filter.requestItem = { $regex: search, $options: "i" };
    }

    const totalDocs = await AssetsModel.countDocuments(filter);
    const totalPages = Math.ceil(totalDocs / pageSize);

    const requestResult = await AssetsModel.find(filter)
      .skip(skip)
      .limit(pageSize)
      .select("requestItem requestStatus IsRecieved returnStatus createdAt")
      .sort({ createdAt: -1 });

    return { requestResult, totalPages };
  } catch (error) {
    throw new Error(error instanceof Error ? error.message : String(error));
  }
};

export const getAssetService = async (
  userId: any,
  page: number,
  limit: number,
  search: string
) => {
  try {
    const { skip, limit: pageSize } = await getPaginationParams(page, limit);

    const userID = new mongoose.Types.ObjectId(userId);

    const filter: any = {
      userId: userID,
      requestStatus: "approved",
    };
    if (search) {
      filter.requestItem = { $regex: search, $options: "i" };
    }

    const totalAssets = await AssetsModel.countDocuments(filter);
    const totalPages = Math.ceil(totalAssets / pageSize);

    const assetsResult = await AssetsModel.find(filter)
      .skip(skip)
      .limit(pageSize)
      .sort({ createdAt: -1 })
      .select("requestItem requestStatus IsRecieved returnStatus createdAt");

    return { assetsResult, totalPages };
  } catch (error) {
    throw new Error(error instanceof Error ? error.message : String(error));
  }
};

export const getAllAssetsService = async (
  userId: any,
  page: number,
  limit: number,
  status: string,
  search: string
) => {
  try {
    const { skip, limit: pageSize } = await getPaginationParams(page, limit);

    const userID = new mongoose.Types.ObjectId(userId);

    const filter: any = { orgId: userID };
    if (status) {
      filter.requestStatus = status;
    }
    if (search) {
      filter.requestItem = { $regex: search, $options: "i" };
    }

    const totalDocs = await AssetsModel.countDocuments(filter);
    const totalPages = Math.ceil(totalDocs / pageSize);
    const assetsResult = await AssetsModel.find(filter)
      .populate("userId", "name email")
      .skip(skip)
      .limit(pageSize)
      .select("requestItem requestStatus IsRecieved returnStatus createdAt")
      .sort({ createdAt: -1 });
    return { assetsResult, totalPages };
  } catch (error) {
    throw new Error(error instanceof Error ? error.message : String(error));
  }
};

export const editAssetsServie = async (
  id: string,
  userId: string,
  requestItem: string
): Promise<any> => {
  try {
    const updatedAsset = await AssetsModel.findByIdAndUpdate(
      id,
      { userId: new mongoose.Types.ObjectId(userId), requestItem },
      { new: true }
    );
    return updatedAsset;
  } catch (error) {
    throw new Error(
      error instanceof Error ? error.message : String(ERROR_MESSAGES.ASSET_UPDATE_ERROR)
    );
  }
}

 export const getAssetByIdService = async (id: string): Promise<any> => {
  try {
    const asset = await AssetsModel.findById(id).populate("userId", "name email");
    if (!asset) {
      throw new Error(ERROR_MESSAGES.DATA_NOT_FOUND);
    }
    return asset;
  } catch (error) {
    throw new Error(
      error instanceof Error ? error.message : String(ERROR_MESSAGES.DATA_NOT_FOUND)
    );
  }
};
export const deleteAssetService = async (id: string): Promise<any> => {
  try {
    const deletedAsset = await AssetsModel.findByIdAndDelete(id);
    if (!deletedAsset) {
      throw new Error(ERROR_MESSAGES.DATA_NOT_DELETED);
    }
    return deletedAsset;
  } catch (error) {
    throw new Error(
      error instanceof Error ? error.message : String(ERROR_MESSAGES.DATA_NOT_DELETED)
    );
  }
}
export const getAllAssetsByUser = async (
  userId: string,
  page: number,
  limit: number,
  status: string,
  search: string
): Promise<{ assetsResult: any[]; totalPages: number }> => {
  try {
    const { skip, limit: pageSize } = await getPaginationParams(page, limit);

    const userID = new mongoose.Types.ObjectId(userId);

    const filter: any = { userId: userID };
    if (status) {
      filter.requestStatus = status;
    }
    if (search) {
      filter.requestItem = { $regex: search, $options: "i" };
    }

    const totalDocs = await AssetsModel.countDocuments(filter);
    const totalPages = Math.ceil(totalDocs / pageSize);
    const assetsResult = await AssetsModel.find(filter)
      .skip(skip)
      .limit(pageSize)
      .sort({ createdAt: -1 })
      .select("requestItem requestStatus IsRecieved returnStatus createdAt");

    return { assetsResult, totalPages };
  } catch (error) {
    throw new Error(error instanceof Error ? error.message : String(error));
  }
}