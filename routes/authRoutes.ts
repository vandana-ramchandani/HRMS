import express from "express";
import {
  registerOrganization,
  login,
  refreshToken,
  changePassword,
  requestResetPassword,
  resetPassword,
  checkmail,
} from "../controllers/auth.controller";
import { authMiddleware } from "../middlewares/auth.middleware";
import { validateOrganization } from "../validate/validateAll";
import passport from "../config/passport.config";
import { googleAuthCallback } from "../controllers/google.auth.controller";

const router = express.Router();

router.post("/organisation", validateOrganization, registerOrganization);
router.post("/login", login);
router.post("/refresh-token", refreshToken);
router.get("/check-mail", checkmail);
router.patch("/change-password", authMiddleware, changePassword);
router.post("/request-reset-password", requestResetPassword);
router.post("/reset-password", resetPassword);

router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

router.get(
  "/google/callback",
  passport.authenticate("google", {
    session: false,
    failureRedirect: "http://localhost:5173/login",
  }),
  googleAuthCallback
);

export default router;
