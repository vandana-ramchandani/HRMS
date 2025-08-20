import mongoose from "mongoose";
import BlogModel from "../models/blog.model";
import { Express } from "express";
import { getPaginationParams } from "../utils/helpers/pagination";

export const createBlogService = async ({
  title,
  content,
  category,
  userId,
  imageFiles,
}: {
  title: string;
  content: string;
  category: string;
  userId: string;
  imageFiles: Express.Multer.File[];
}) => {
  const imageFilenames = imageFiles.map((file) => file.path);

  const newBlog = new BlogModel({
    title,
    content,
    category,
    userId,
    images: imageFilenames,
  });

  return await newBlog.save();
};

export const editBlogService = async ({
  id,
  title,
  content,
  category,
  userId,
  imageFiles,
}: {
  id: string;
  title: string;
  content: string;
  category: string;
  userId: string;
  imageFiles: Express.Multer.File[];
}) => {
  const imageFilenames = imageFiles.map((file) => file.path);

  const updatedBlog = await BlogModel.findByIdAndUpdate(
    id,
    {
      title,
      content,
      category,
      images: imageFilenames.length > 0 ? imageFilenames : undefined,
    },
    { new: true }
  );

  if (!updatedBlog) {
    throw new Error("Blog not found");
  }

  return updatedBlog;
};

export const deleteBlogService = async (id: string) => {
  const deletedBlog = await BlogModel.findByIdAndDelete(id);
  return deletedBlog;
};

// export const getAllBlogService = async (
//   limit: number,
//   page: number
// ) => {
//   const totalBlogs = await BlogModel.countDocuments();
//   const totalPages = Math.ceil(totalBlogs / limit);
//   const blogs = await BlogModel.aggregate([
//     {
//       $lookup: {
//         from: "blogcategories",
//         localField: "category",
//         foreignField: "_id",
//         as: "blogCategory",
//       },
//     },
//     {
//       $lookup: {
//         from: "users",
//         localField: "userId",
//         foreignField: "_id",
//         as: "user",
//       },
//     },
//     {
//       $project: {
//         title: 1,
//         content: 1,
//         images: 1,
//         categoryName: { $arrayElemAt: ["$blogCategory.name", 0] },
//         userName: { $arrayElemAt: ["$user.name", 0] },
//       },
//     },
//     {
//       $skip: (page - 1) * limit,
//     },
//     {
//       $limit: limit,
//     },
//   ]);
//   return {blogs, totalPages};
// };

export const getAllBlogService = async (limit: number, page: number) => {
  const { skip, limit: pageSize } = await getPaginationParams(page, limit);

  const totalBlogs = await BlogModel.countDocuments();

  const totalPages = Math.ceil(totalBlogs / pageSize);

  const blogs = await BlogModel.find()
    .populate({ path: 'category', select: 'name' })
    .populate({ path: "userId", select: "name" })
    .skip(skip)
    .limit(pageSize)
    .select("title content images")
    .sort({ createdAt: -1 })

  return { blogs, totalPages };
};

export const getBlogByCategoryService = async (
  category: string,
  limit: number,
  page: number
) => {
  const categoryId = new mongoose.Types.ObjectId(category);
  const { skip, limit: pageSize } = await getPaginationParams(page, limit);

  const totalBlogs = await BlogModel.countDocuments({ category: categoryId });
  const totalPages = Math.ceil(totalBlogs / pageSize);

  const blogs = await BlogModel.aggregate([
    { $match: { category: categoryId } },
    {
      $lookup: {
        from: "blogcategories",
        localField: "category",
        foreignField: "_id",
        as: "blogCategory",
      },
    },
    {
      $lookup: {
        from: "users",
        localField: "userId",
        foreignField: "_id",
        as: "user",
      },
    },
    {
      $project: {
        title: 1,
        content: 1,
        images: 1,
        categoryName: { $arrayElemAt: ["$blogCategory.name", 0] },
        userName: { $arrayElemAt: ["$user.name", 0] },
      },
    },
    { $skip: skip },
    { $limit: pageSize },
  ]);

  return { blogs, totalPages };
};
