import express from "express";
import * as postController from "../controllers/post.controller";
import { authMiddleware } from "../middlewares/auth.middleware";
import { upload } from "../config/cloudinary.config";
import { postValidation } from "../validate/joi.validation";

const router = express.Router();

router.post(
  "/",
  authMiddleware,
  upload.single("image"),
  postValidation,
  postController.create
);
router.put(
  "/:id",
  authMiddleware,
  upload.single("image"),
  postValidation,
  postController.update
);
router.delete("/:id", authMiddleware, postController.remove);

router.get("/", authMiddleware, postController.getAll);
router.get("/search/:id", authMiddleware, postController.search);

export default router;
