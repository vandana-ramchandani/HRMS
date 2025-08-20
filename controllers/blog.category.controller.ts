import { Request, Response } from "express";
import {
  createBlogCategory,
  deleteBlogCategory,
  editBlogCategory,
  getAllBlogCategory,
} from "../services/blog.category.service";
import blogCategoryModel from "../models/blogcategory.model";
import { ERROR_MESSAGES } from "../constants/errorMessage";
import { SUCCESS_MESSAGES } from "../constants/successmessage";

export const createCategory = async (req: Request, res: any) => {
  try {
    const { name, description } = req.body;
    const image = req.file ? req.file.path : null;
    const existingCategory = await blogCategoryModel.findOne({ name });
    if (existingCategory) {
      res.status(400).json({
        status: false,
        message: ERROR_MESSAGES.BLOG_CATEGORY_ALREADY_EXIST,
        timestamp: new Date(),
      });
    }
    const newCategory = await createBlogCategory({ name, description, image });

    res.status(201).json({
      status: true,
      message: SUCCESS_MESSAGES.BLOG_CATEGORY_CREATED,
      timestamp: new Date(),
    });
  } catch (error: any) {
    res.status(400).json({
      status: false,
      message: ERROR_MESSAGES.INTERNAL_ERROR,
      timestamp: new Date(),
    });
  }
};

export const editCategory = async (req: Request, res: any) => {
  try {
    const { id } = req.params;
    const { name, description } = req.body;
    const image = req.file ? req.file.path : null;

    const updatedCategory = await editBlogCategory({
      id,
      name,
      description,
      image,
    });

    res.status(200).json({
      status: true,
      message: SUCCESS_MESSAGES.BLOG_CATEGORY_UPDATED,
      timestamp: new Date(),
    });
  } catch (error: any) {
    res.status(400).json({
      status: false,
      message: ERROR_MESSAGES.INTERNAL_ERROR,
      timestamp: new Date(),
    });
  }
};

export const deleteCategory = async (req: Request, res: any) => {
  try {
    const { id } = req.params;

    const deletedCategory = await deleteBlogCategory(id);

    if (!deletedCategory) {
      res.status(404).json({
        status: false,
        message: ERROR_MESSAGES.CATEGORY_NOT_FOUND,
        timestamp: new Date(),
      });
    }

    res.status(200).json({
      status: true,
      message: SUCCESS_MESSAGES.BLOG_CATEGORY_DELETED,
      timestamp: new Date(),
    });
  } catch (error: any) {
    res.status(500).json({
      status: false,
      message: ERROR_MESSAGES.INTERNAL_ERROR,
      timestamp: new Date(),
    });
  }
};

export const allBlogsCategory = async (req: Request, res: any) => {
  try {
    const categories = await getAllBlogCategory();
    res.status(200).json({
      status: true,
      message: SUCCESS_MESSAGES.BLOG_CATEGORY_RETRIEVED,
      timestamp: new Date(),
      data: categories,
    });
  } catch (error: any) {
    res.status(500).json({
      status: false,
      message: ERROR_MESSAGES.INTERNAL_ERROR,
      timestamp: new Date(),
    });
  }
};

export const getCategoryById = async (req: Request, res: any) => {
  try {
    const { id } = req.params;
    const category = await blogCategoryModel.findById(id).select("-__v ");

    if (!category) {
      return res.status(404).json({
        status: false,
        message: ERROR_MESSAGES.CATEGORY_NOT_FOUND,
        timestamp: new Date(),
      });
    }
    res.status(200).json({
      status: true,
      message: SUCCESS_MESSAGES.BLOG_CATEGORY_RETRIEVED,
      timestamp: new Date(),
      data: category,
    });
  } catch (error: any) {
    res.status(500).json({
      status: false,
      message: ERROR_MESSAGES.INTERNAL_ERROR,
      timestamp: new Date(),
    });
  }
};
