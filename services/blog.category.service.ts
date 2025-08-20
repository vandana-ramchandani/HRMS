import { ERROR_MESSAGES } from "../constants/errorMessage";
import blogCategoryModel from "../models/blogcategory.model";

export const createBlogCategory = async (data: any) => {
  try {
    const { name, description, image } = data;
    const newCategory = await blogCategoryModel.create({
      name,
      description,
      image,
    });
    await newCategory.save();

    return newCategory;
  } catch (error: any) {
    throw new Error(ERROR_MESSAGES.ERROR_CREATING_CATEGORY);
  }
};

export const editBlogCategory = async (data: any) => {
  try {
    const { id, name, description, image } = data;
    const updatedCategory = await blogCategoryModel.findByIdAndUpdate(
      id,
      { name, description, image },
      { new: true }
    );
    return updatedCategory;
  } catch (error: any) {
    throw new Error(ERROR_MESSAGES.ERROR_UPDATING_CATEGORY);
  }
};

export const deleteBlogCategory = async (id: string) => {
  try {
    const deletedCategory = await blogCategoryModel.findByIdAndDelete(id);

    return deletedCategory;
  } catch (error: any) {
    throw new Error(ERROR_MESSAGES.ERROR_DELETING_CATEGORY);
  }
};

export const getAllBlogCategory = async () => {
  const category = await blogCategoryModel
    .find()
    .select("name description image");
  return category;
};
