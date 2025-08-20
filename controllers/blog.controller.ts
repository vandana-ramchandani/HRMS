import e, { Request, Response, NextFunction } from "express";
import {
  createBlogService,
  deleteBlogService,
  editBlogService,
  getAllBlogService,
  getBlogByCategoryService,
} from "../services/blog.services";
import BlogModel from "../models/blog.model";
import { SUCCESS_MESSAGES } from "../constants/successmessage";
import { ERROR_MESSAGES } from "../constants/errorMessage";
import { time } from "console";
import { AuthenticatedRequest } from "../utils/helpers/authenticated.request";

export const createBlogController = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { userId } = req.user;
    const { title, content, category } = req.body;
    const imageFiles =
      (req.files as { [fieldname: string]: Express.Multer.File[] })?.image ||
      [];

    const newBlog = await createBlogService({
      title,
      content,
      category,
      userId,
      imageFiles,
    });

    res.status(201).json({
      status: true,
      message: SUCCESS_MESSAGES.BLOG_CREATED,
      timestamp: new Date(),
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      message: ERROR_MESSAGES.INTERNAL_ERROR,
      timestamp: new Date(),
    });
  }
};

export const editBlogController = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { userId } = req.user;
    const { title, content, category } = req.body;
    const { id } = req.params;

    const imageFiles =
      (req.files as { [fieldname: string]: Express.Multer.File[] })?.image ||
      [];

    const updatedBlog = await editBlogService({
      id,
      title,
      content,
      category,
      userId,
      imageFiles,
    });

    res.status(200).json({
      status: true,
      message: SUCCESS_MESSAGES.BLOG_UPDATED,
      timestamp: new Date(),
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      message: ERROR_MESSAGES.INTERNAL_ERROR,
      timestamp: new Date(),
    });
  }
};

export const deleteBlogController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;

    const deletedBlog = await deleteBlogService(id);

    res.status(200).json({
      status: true,
      message: SUCCESS_MESSAGES.BLOG_DELETED,
      timestamp: new Date(),
    });
  } catch (error) {
    res
      .status(500)
      .json({
        status: false,
        message: ERROR_MESSAGES.INTERNAL_ERROR,
        timestamp: new Date(),
      });
  }
};

export const getAllBlogsController = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const limit = parseInt(req.query.limit as string);
    const page = parseInt(req.query.page as string);
    const { blogs, totalPages } = await getAllBlogService(limit, page);
    res.status(200).json({
      status: true,
      message: SUCCESS_MESSAGES.BLOG_RETRIEVED,
      timestamp: new Date(),
      data: { data: blogs, totalPages },
    });
  } catch (error: any) {
    res
      .status(400)
      .json({ status: false, message: error.message, timestamp: new Date() });
  }
};

export const getBlogByCategoryController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const category = req.params.category;
    const limit = parseInt(req.query.limit as string);
    const page = parseInt(req.query.page as string);
    console.log(category,page,limit,"<<<")
    const { blogs, totalPages } = await getBlogByCategoryService(
      category,
      limit,
      page
    );

    res.status(200).json({
      status: true,
      message: SUCCESS_MESSAGES.BLOG_RETRIEVED,
      timestamp: new Date(),
      data: {
        data: blogs,
        totalPages,
      },
    });
  } catch (error: any) {
    res
      .status(400)
      .json({ status: false, message: error.message, timestamp: new Date() });
  }
};
