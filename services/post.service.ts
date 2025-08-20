import { string } from "joi";
import { ERROR_MESSAGES } from "../constants/errorMessage";
import Post from "../models/post.model";

import { AppError } from "../utils/helpers/ global.error.handler";
import { skip } from "node:test";

export const createPost = async (
  content: any,
  userId: string,
  imageUrl: string,
  department: string
) => {

  const post = new Post({ content, image: imageUrl, createdBy: userId , department});
  return await post.save();
};

export const updatePost = async (
  postId: string,
  data: any,
  userId: string,
  imageUrl?: string
) => {
  const updateData = { ...data };
  if (imageUrl) {
    updateData.image = imageUrl;
  }

  const post = await Post.findOneAndUpdate(
    { _id: postId, createdBy: userId },
    updateData,
    { new: true }
  );

  if (!post) {
    throw new AppError(ERROR_MESSAGES.POST_NOTFOUND_UNAUTHORIZED, 404);
  }
  return post;
};
export const deletePost = async (postId: string, userId: string) => {
  const post = await Post.findOneAndDelete({ _id: postId, createdBy: userId });
  if (!post) {
    throw new AppError(ERROR_MESSAGES.POST_NOTFOUND_UNAUTHORIZED, 404);
  }
  return post;
};

export const getAllPosts = async (limit: number, page: number) => {
  const skipCount = (page - 1) * limit;

  return await Post.find({}, { __v: 0 })
    .populate("createdBy", "name")
    .sort({ createdAt: -1 })
    .skip(skipCount)
    .limit(limit);
};

export const searchPosts = async (query: string) => {
  return await Post.find({ content: { $regex: query, $options: "i" } });
};
