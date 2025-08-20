import express from "express";
import {
  addLandingCardController,
  getLandingCardController,
  landingcards,
} from "../controllers/landingcard.controller";
import { validateCreateLandingCard } from "../validate/landing.validate";
import { upload } from "../config/cloudinary.config";
// import upload from '../utils/helpers/multer';
const router = express.Router();

router.post(
  "/create-landing-card",
  upload.single("image"),
  validateCreateLandingCard,
  addLandingCardController
);
// router.get('/get-landing-card',getLandingCardController );

router.get("/get-landing-card", landingcards);

export default router;
