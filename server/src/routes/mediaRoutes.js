import express from "express";
import { getMediaController } from "../controllers/mediaController.js";

const router = express.Router();
router.get("/", getMediaController);

export default router;
