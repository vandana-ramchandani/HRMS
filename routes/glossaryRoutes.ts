import express from "express";
import { getGlossary } from "../controllers/glossary.controller";

const router = express.Router();

router.get("/glossary", getGlossary);

export default router;
