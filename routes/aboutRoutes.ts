import express from "express";
import { getAboutKeka, getTeamDetails } from "../controllers/about.controller";

const router = express.Router();

router.get("/team-details", getTeamDetails);
router.get("/", getAboutKeka);

export default router;
