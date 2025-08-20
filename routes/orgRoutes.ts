import express from "express";
import {
  isOrganisation,
  isSuperAdmin,
} from "../middlewares/isadmin.middleware";
import { authMiddleware } from "../middlewares/auth.middleware";
import {
  createUser,
  getAllUsers,
  getUser,
  updateUser,
  deleteUser,
  getOrganization,
  updateOrganization,
  deleteOrganization,
  uploadLogo,
  deleteLogo,
  createUserProfile,
} from "../controllers/org.controller";
import {
  createDepartment,
  getAllDepartments,
  getDepartmentById,
  updateDepartment,
  deleteDepartment,
  getUsersByDepartment,
  findUserByName,
} from "../controllers/department.controller";
import { upload } from "../config/cloudinary.config";
import {
  createProfileValidation,
  holidayValidation,
} from "../validate/joi.validation";
import { create, update, remove } from "../controllers/holiday.controllers";
import {
  validateAddJobDetails,
  validateAssetsResponse,
  validateAssignAssets,
  validateEditJobDetails,
} from "../validate/user.profile.validate";
import {
  assestRecieved,
  assestReturn,
  assetsResponse,
  assignAsset,
  getAllAssets,
  getAssetById,
  getAssetByUser,
} from "../controllers/assets.controller";
import {
  addJobdetails,
  deleteJobDetails,
  editJobDetails,
} from "../controllers/job.details.controller";
import {
  updateEmployee,
  validateCreateProject,
  validateEmployee,
  validateLeaveResponse,
  validatePraisePost,
} from "../validate/validateAll";
import {
  addBadge,
  editBadge,
  getBadges,
  removeBadge,
} from "../controllers/badge.controller";
import base64FileUpload from "../middlewares/base64FileUpload";
import {
  createPraiseController,
  deletePraiseController,
  getAllPraise,
  getPraiseByIdController,
  updatePraiseController,
} from "../controllers/praise.controller";
import { max } from "moment";
import { getAllLeaves, getAllLeavesOfUser, leaveResponse } from "../controllers/leave.controller";
import { ownDept } from "../services/dept.services";
import { addProject, getProjectController } from "../controllers/project.controller";

const router = express.Router();
//employee


router.post(
  "/employees",
  authMiddleware,
  isOrganisation,
  validateEmployee,
  createUser
);
router.get("/employees", authMiddleware, getAllUsers);
router.get("/employee/:id", authMiddleware, isOrganisation, getUser);
router.patch(
  "/employee/:id",
  authMiddleware,
  updateEmployee,
  isOrganisation,
  updateUser
);
router.delete("/employee/:id", authMiddleware, isOrganisation, deleteUser);
router.post(
  "/org/logo",
  authMiddleware,
  isOrganisation,
  upload.single("logo"),
  uploadLogo
);
router.delete("/org/logo", authMiddleware, isOrganisation, deleteLogo);

router.post("/dept", authMiddleware, isOrganisation, createDepartment);
router.get("/department",authMiddleware,ownDept)
router.get("/dept", authMiddleware, getAllDepartments);
router.get("/dept/:id", authMiddleware, getDepartmentById);
router.put("/dept/:id", authMiddleware, isOrganisation, updateDepartment);
router.delete("/dept/:id", authMiddleware, isOrganisation, deleteDepartment);
router.get("/dept/users/:departmentId", authMiddleware, getUsersByDepartment);
router.get("/search", authMiddleware, findUserByName);

//holiday
router.post(
  "/holiday",
  authMiddleware,
  isOrganisation,
  upload.single("holidayImage"),
  holidayValidation,
  create
);
router.put(
  "/holiday/:id",
  authMiddleware,
  isOrganisation,
  holidayValidation,
  update
);
router.delete("/holiday/:id", authMiddleware, isOrganisation, remove);

//user-profile-routes

router.post(
  "/setprofile",
  authMiddleware,
  isOrganisation,
  createProfileValidation,
  upload.single("photo"),
  createUserProfile
);

router.post(
  "/job-details",
  authMiddleware,
  isOrganisation,
  validateAddJobDetails,
  addJobdetails
);

router.patch(
  "/job-details/:userId",
  authMiddleware,
  isOrganisation,
  validateEditJobDetails,
  editJobDetails
);
router.delete(
  "/job-details/:userId",
  authMiddleware,
  isOrganisation,
  deleteJobDetails
);
// assets
router.patch(
  "/assets/:id",
  authMiddleware,
  isOrganisation,
  validateAssetsResponse,
  assetsResponse
);
router.patch(
  "/assets-recieved/:id",
  authMiddleware,
  isOrganisation,
  assestRecieved
);
router.patch(
  "/assets-return/:id",
  authMiddleware,
  isOrganisation,
  assestReturn
);
router.get("/assets", authMiddleware,isOrganisation, getAllAssets);
router.get("/asset/:id",authMiddleware,getAssetById)
router.get("/user-assets/:userId", authMiddleware, isOrganisation, getAssetByUser);
// badges
router.post("/badge", authMiddleware,isOrganisation,upload.single("image"),addBadge);
router.patch("/badge/:id", editBadge);
router.delete("/badge/:id", removeBadge);
router.get("/badge",authMiddleware, getBadges);

//praise
router.post(
  "/praise",
  authMiddleware,
  upload.array("image", 5),
  validatePraisePost,
  createPraiseController
);
router.get("/praise", authMiddleware, getAllPraise);
router.patch(
  "/praise/:id",
  authMiddleware,
  upload.array("image", 5),
  validatePraisePost,
  updatePraiseController
);
router.delete("/praise/:id", authMiddleware, deletePraiseController);
router.get("/praise/:id", authMiddleware, getPraiseByIdController);

// leave
router.get("/leaves",authMiddleware,getAllLeaves)
router.get("/leaves/:userId",authMiddleware,isOrganisation,getAllLeavesOfUser)
router.patch("/leave-request/:id",authMiddleware,isOrganisation,validateLeaveResponse,leaveResponse)

// project
router.post("/project",authMiddleware,isOrganisation,validateCreateProject,addProject)
router.get("/project",authMiddleware,isOrganisation,getProjectController)
export default router;
