import express from "express";
import { getMediaController } from "../controllers/mediaController.js";

const router = express.Router();
router.get("/:userId", getMediaController);

export default router;
