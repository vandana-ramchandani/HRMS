import { Schema, model } from "mongoose";

const blogSchema = new Schema(
  {
    title: { type: String, required: true },
    content: { type: String, required: true },
    images: [{ type: String }],
    category: {
      type: Schema.Types.ObjectId,
      ref: "blogCategory",
      required: true,
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    delete_flag: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const BlogModel = model("blogs", blogSchema);
export default BlogModel;
