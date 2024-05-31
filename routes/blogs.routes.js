import { Router } from "express";
import {
  deleteBlogById,
  getAllBlogs,
  getBlogById,
  uploadBlog,
} from "../controllers/blogs.controller.js";
import { upload } from "../middleware/multer.middleware.js";
const router = Router();

router.route("/getBlogs").get(getAllBlogs);
router.route("/getBlogById").get(getBlogById);
router.route("/uploadBlog").post(
  upload.fields(
    [{
      name: "markdownFile",
      maxCount: 1,
    },
    {
      name: "thumbnailFile",
      maxCount: 1,
    }]
  ),uploadBlog
);
router.route("/deleteBlogById").post(deleteBlogById);

export default router;
