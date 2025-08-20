import { Router } from "express";
import { contactUs } from "../controllers/contact.controller";
import { validateContactus } from "../validate/validateAll";

const router = Router();

router.post("/contact", validateContactus, contactUs);

export default router;
