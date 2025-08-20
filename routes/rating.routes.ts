import express from "express";
import {
  createRatingController,
  getAverageRatingController,
} from "../controllers/rating.contoller";
import upload from "../utils/helpers/multer";
import { validateCreateRating } from "../validate/rating.validate";
const router = express.Router();

router.post(
  "/create-rating",
  upload.none(),
  validateCreateRating,
  createRatingController
);
router.get("/get-rating", getAverageRatingController);
export default router;
