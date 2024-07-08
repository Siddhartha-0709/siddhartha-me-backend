import { Router } from "express";
import { createUser, userLogin } from "../controllers/user.controller.js";

const router = Router();

router.route("/create").post(createUser);
router.route("/login").post(userLogin);

export default router