import { Request, Response } from "express";
import * as postService from "../services/post.service";
import { ERROR_MESSAGES } from "../constants/errorMessage";
import { SUCCESS_MESSAGES } from "../constants/successmessage";
import { v2 as cloudinary } from "cloudinary";
import { timeStamp } from "console";
import { date } from "joi";

cloudinary.config({
  cloudinary_url: process.env.CLOUDINARY_URL,
});

export const create = async (req: any, res: Response) => {
  try {
    const imageUrl = req.file?.path;
    const userId = req.user.userId;
    const { content, department } = req.body;
    const post = await postService.createPost(content, userId, imageUrl ,department);
    res
      .status(201)
      .json({
        status: true,
        message: SUCCESS_MESSAGES.POST_CREATED,
        timestamp: new Date(),
      });
  } catch (error) {
    res
      .status(500)
      .json({ status: false, message: ERROR_MESSAGES.POST_NOT_CREATED });
  }
};

export const update = async (req: any, res: Response) => {
  try {
    const imageUrl = req.file?.path;
    const post = await postService.updatePost(
      req.params.id,
      req.body,
      req.user.userId,
      imageUrl
    );
    res.status(200).json({ status: true, post });
  } catch (error) {
    res
      .status(500)
      .json({
        status: false,
        message: ERROR_MESSAGES.POST_UPDATING_ERROR,
        timeStamp: new Date(),
      });
  }
};

export const remove = async (req: any, res: Response) => {
  try {
    await postService.deletePost(req.params.id, req.user.userId);
    res.status(200).json({ message: SUCCESS_MESSAGES.POST_DELETE });
  } catch (error) {
    res.status(500).json({ message: ERROR_MESSAGES.POST_DELETE_ERROR });
  }
};

export const getAll = async (req: Request, res: Response) => {
  try {
    const limit = parseInt(req.query.limit as string);
    const page = parseInt(req.query.page as string);
    const posts = await postService.getAllPosts(limit, page);

    res.status(200).json({ status: true,message:SUCCESS_MESSAGES.POST_RETRIVED, timeStamp: new Date(), data: posts });
  } catch (error) {
    res
      .status(500)
      .json({
        status: false,
        message: ERROR_MESSAGES.POST_GETTING_ERROR,
        timeStamp: new Date(),
      });
  }
};

export const search = async (req: Request, res: Response) => {
  try {
    const posts = await postService.searchPosts(req.query.q as string);
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ message: ERROR_MESSAGES.POST_SEARCHING_ERROR });
  }
};
