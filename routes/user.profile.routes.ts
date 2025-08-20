import express from "express";
import { getJobDetails } from "../controllers/job.details.controller";
import {
  assignAsset,
  deleteAsset,
  editAsset,
  getAssetsRequests,
  getAssignedAssets,
} from "../controllers/assets.controller";
import { authMiddleware } from "../middlewares/auth.middleware";
import { addRelation } from "../controllers/relation.controller";
import { updateUserProfile } from "../controllers/userprofile.controller";
import { upload } from "../config/cloudinary.config";
import {
  uploadPDF,
  getAllPDFs,
  editPDF,
  deletePDF,
  getPDFById,
} from "../controllers/document.controller";
import { uploadToMemory } from "../utils/helpers/multer";
import { validatePDFDocument } from "../validate/validateAll";
import { validateAssignAssets } from "../validate/user.profile.validate";
import { createProfileValidation } from "../validate/joi.validation";
import { getUserProfile } from "../controllers/userprofile.controller";
const router = express.Router();
router.get("/job-detail/:userId", authMiddleware, getJobDetails);
//assets 
router.post("/assets", authMiddleware, validateAssignAssets, assignAsset);
router.get("/assigned-assets", authMiddleware, getAssignedAssets);
router.patch("/assets/:id",authMiddleware,validateAssignAssets,editAsset)
router.get("/assets-request", authMiddleware, getAssetsRequests);
router.delete("/asset/:id", authMiddleware, deleteAsset);

router.post("/relation", authMiddleware, addRelation);
router.get("/myprofile", authMiddleware, getUserProfile);
router.patch(
  "/",
  authMiddleware,
  createProfileValidation,
  upload.single("photo"),
  updateUserProfile
);
//document routes
router.post(
  "/documents",
  authMiddleware,
  uploadToMemory.single("pdf"),
  validatePDFDocument,
  uploadPDF
);
router.get("/documents", authMiddleware, getAllPDFs);

router.get("/documents/:id", authMiddleware, getPDFById);

router.put(
  "/documents/:id",
  authMiddleware,
  uploadToMemory.single("pdf"),
  editPDF
);
router.delete("/documents/:id", authMiddleware, deletePDF);

router.post("/relation", authMiddleware, addRelation);
export default router;
