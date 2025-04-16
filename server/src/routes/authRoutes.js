import express from "express";
import { configDotenv } from "dotenv";
import {
  getLongAccessToken,
  postAccessToken,
} from "../controllers/authController.js";

configDotenv();

const router = express.Router();

router.route("/access-token").post(postAccessToken).get(getLongAccessToken);

export default router;
