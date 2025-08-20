import express from "express";
import { authMiddleware } from "../middlewares/auth.middleware";
import { isSuperAdmin } from "../middlewares/isadmin.middleware";
import {
  getAllOrganizations,
  getOrganizationById,
  updateOrganization,
  deleteOrganization,
  createOrganization,
} from "../controllers/superAdmin.controller";
import { validateGlossary } from "../validate/validateAll";
import {
  createGlossary,
  deleteGlossary,
  updateGlossary,
} from "../controllers/glossary.controller";
import { upload } from "../config/cloudinary.config";
import {
  aboutKekaValidation,
  holidayValidation,
  jobCreateValidation,
  updateJobValidation,
} from "../validate/joi.validation";
import { create, remove, update } from "../controllers/holiday.controllers";
import {
  createBlogController,
  deleteBlogController,
  editBlogController,
} from "../controllers/blog.controller";
import {
  validatecreateBlog,
  validateCreateblogCategory,
  validateEditblogCategory,
} from "../validate/blogValidate";
import {
  createCategory,
  deleteCategory,
  editCategory,
  getCategoryById,
} from "../controllers/blog.category.controller";
import {
  getContactDetails,
  deleteContact,
} from "../controllers/contact.controller";
import * as jobController from "../controllers/job.controller";
import {
  validateCreateTeamMember,
  validateEditTeamMember,
} from "../validate/about.validate";

import {
  addTeamMember,
  deleteAboutKeka,
  deleteTeamMember,
  editTeamMember,
  getAboutKekaById,
  postAboutKeka,
  updateAboutKeka,
} from "../controllers/about.controller";

const router = express.Router();
//organisation
router.get("/orgs", authMiddleware, isSuperAdmin, getAllOrganizations);
router.get("/org/:id", authMiddleware, isSuperAdmin, getOrganizationById);
router.post("/orgs", authMiddleware, isSuperAdmin, createOrganization);
router.patch("/orgs/:id", authMiddleware, isSuperAdmin, updateOrganization);
router.delete("/orgs/:id", authMiddleware, isSuperAdmin, deleteOrganization);

//glossary
router.post(
  "/glossary",
  validateGlossary,
  authMiddleware,
  isSuperAdmin,
  createGlossary
);
router.patch("/glossary/:id", authMiddleware, isSuperAdmin, updateGlossary);
router.delete("/glossary/:id", authMiddleware, isSuperAdmin, deleteGlossary);

//holiday
router.post(
  "/holiday",
  authMiddleware,
  isSuperAdmin,
  upload.single("holidayImage"),
  holidayValidation,
  create
);
router.put(
  "/holiday/:id",
  authMiddleware,
  isSuperAdmin,
  holidayValidation,
  update
);
router.delete("/holiday/:id", authMiddleware, isSuperAdmin, remove);

//Job
router.post(
  "/job",
  authMiddleware,
  isSuperAdmin,
  jobCreateValidation,
  jobController.create
);
router.patch(
  "/job/:id",
  authMiddleware,
  isSuperAdmin,
  updateJobValidation,
  jobController.update
);
router.delete("/job/:id", authMiddleware, isSuperAdmin, jobController.remove);

//contactDetails
router.get("/contact", authMiddleware, isSuperAdmin, getContactDetails);
router.delete("/contact/:id", authMiddleware, isSuperAdmin, deleteContact);

//blog-category
router.post(
  "/blog-category",
  authMiddleware,
  isSuperAdmin,
  upload.single("banner"),
  validateCreateblogCategory,
  createCategory
);
router.patch(
  "/blog-category/:id",
  authMiddleware,
  isSuperAdmin,
  upload.single("banner"),
  validateEditblogCategory,
  editCategory
);
router.delete(
  "/blog-category/:id",
  authMiddleware,
  isSuperAdmin,
  deleteCategory
);
router.get("/blog-category/:id", authMiddleware, isSuperAdmin, getCategoryById);
//blog
router.post(
  "/blog",
  authMiddleware,
  isSuperAdmin,
  upload.fields([{ name: "image", maxCount: 5 }]),
  validatecreateBlog,
  createBlogController
);
router.patch(
  "/blog/:id",
  authMiddleware,
  isSuperAdmin,
  upload.fields([{ name: "image", maxCount: 5 }]),
  validatecreateBlog,
  editBlogController
);
router.delete("/blog/:id", authMiddleware, isSuperAdmin, deleteBlogController);

//About-routes
router.post(
  "/team",
  authMiddleware,
  isSuperAdmin,
  upload.single("image"),
  validateCreateTeamMember,
  addTeamMember
);
router.patch(
  "/team/:id",
  authMiddleware,
  isSuperAdmin,
  upload.single("image"),
  validateEditTeamMember,
  editTeamMember
);
router.delete("/team/:id", authMiddleware, isSuperAdmin, deleteTeamMember);

router.post(
  "/about",
  authMiddleware,
  isSuperAdmin,
  upload.single("image"),
  aboutKekaValidation,
  postAboutKeka
);
router.get("/about/:id", authMiddleware, isSuperAdmin, getAboutKekaById);
router.put(
  "/about/:id",
  authMiddleware,
  isSuperAdmin,
  upload.single("image"),
  updateAboutKeka
);
router.delete("/about/:id", 
  authMiddleware, 
  isSuperAdmin, 
  deleteAboutKeka);
  
export default router;
