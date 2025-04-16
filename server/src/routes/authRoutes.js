import { configDotenv } from "dotenv";
import express from "express";
import { handleInstagramCallback } from "../controllers/authController.js";

configDotenv();

const router = express.Router();

router.get("/instagram/callback", handleInstagramCallback);

export default router;
