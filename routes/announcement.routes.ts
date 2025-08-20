import express from "express";
import {
  createAnnouncement,
  getAnnouncement,
  updateAnnouncement,
  deleteAnnouncement,
} from "../controllers/announcement.controller";
import { authMiddleware } from "../middlewares/auth.middleware";
import { upload } from "../config/cloudinary.config";
import { validateAnnouncement } from "../validate/validateAll";

const router = express.Router();

router.post(
  "/announcements",
  authMiddleware,
  upload.single("photo"),
  validateAnnouncement,
  createAnnouncement
);
router.get("/announcements", authMiddleware, getAnnouncement);
router.patch(
  "/announcement/:id",
  authMiddleware,
  upload.single("photo"),
  updateAnnouncement
);
router.delete("/announcement/:id", authMiddleware, deleteAnnouncement);

export default router;
