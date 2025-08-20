import express from "express";
import {
  getAboutKeka,
  getTeamDetails,
  getTeamMemberDetails,
} from "../controllers/about.controller";
import { allBlogsCategory } from "../controllers/blog.category.controller";
import {
  getAllBlogsController,
  getBlogByCategoryController,
} from "../controllers/blog.controller";
import { getGlossary } from "../controllers/glossary.controller";
import { validateCreateLandingCard } from "../validate/landing.validate";
import { upload } from "../config/cloudinary.config";
import {
  addLandingCardController,
  landingcards,
} from "../controllers/landingcard.controller";
import { validateCreateRating } from "../validate/rating.validate";
import {
  createRatingController,
  getAverageRatingController,
} from "../controllers/rating.contoller";
import * as jobController from "../controllers/job.controller";
import { validateContactus } from "../validate/validateAll";
import { contactUs } from "../controllers/contact.controller";
import { authMiddleware } from "../middlewares/auth.middleware";
import { getBadge, getBadges } from "../controllers/badge.controller";
import { searchEmp } from "../utils/helpers/search.emp";

const router = express.Router();
//about
router.get("/our-team", getTeamDetails);
router.get("/our-team/:id", getTeamMemberDetails);
router.get("/about", getAboutKeka);

//blog
router.get("/blogs-category", allBlogsCategory);
router.get("/blogs", getAllBlogsController);
router.get("/blogs/:category", getBlogByCategoryController);

//glossary
router.get("/glossary", getGlossary);

//job
router.get("/career", jobController.getCareerContent);
router.get("/jobs", jobController.getAll);
router.get("/job/:id", jobController.getById);

//landingCard
router.post(
  "/homepage-cards",
  upload.single("image"),
  validateCreateLandingCard,
  addLandingCardController
);
router.get("/homepage-cards", landingcards);

//rating
router.post(
  "/rating",
  upload.none(),
  validateCreateRating,
  createRatingController
);
router.get("/app-rating", getAverageRatingController);

//contact
router.post("/contact", validateContactus, contactUs);

//badges
router.get("/badge/:id", getBadge);

//search employee based on there name
router.get("/search-emp/:name", searchEmp);
export default router;
