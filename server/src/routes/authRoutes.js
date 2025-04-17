import express from "express";
import {
  handleInstagramCallback,
  handleInstagramLogin,
} from "../controllers/authController.js";

const router = express.Router();

router.get("/instagram", handleInstagramLogin);
router.get("/instagram/callback", handleInstagramCallback);

export default router;
