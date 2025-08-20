import express from "express";
import { allBlogsCategory } from "../controllers/blog.category.controller";

import {
  getAllBlogsController,
  getBlogByCategoryController,
} from "../controllers/blog.controller";

const router = express.Router();

router.get("/get-blog-category", allBlogsCategory);
router.get("/get-blog", getAllBlogsController);
router.get("/get-blog/:category", getBlogByCategoryController);

export default router;
