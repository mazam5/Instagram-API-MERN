import express from "express";
import { handleInstagramCallback } from "../controllers/instagramController.js";
import { configDotenv } from "dotenv";

configDotenv();

const router = express.Router();

router.get("/instagram/callback", handleInstagramCallback);

export default router;
