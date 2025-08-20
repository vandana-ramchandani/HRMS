import mongoose from "mongoose";

const announcementSchema = new mongoose.Schema(
  {
    photo: {
      type: String,
    },
    title: {
      type: String,
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
    author: {
      type: String,
      required: true,
    },
    authorId: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      enum: ["general", "event"],
      required: true,
    },
    status: {
      type: String,
      enum: ["active", "closed"],
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Announcement = mongoose.model("Announcement", announcementSchema);
export default Announcement;
