import { configDotenv } from "dotenv";
import express from "express";
import {
  handleInstagramCallback,
  handleInstagramLogin,
} from "../controllers/authController.js";

configDotenv();

const router = express.Router();

router.get("/instagram", handleInstagramLogin);
router.get("/instagram/callback", handleInstagramCallback);

export default router;
