import express from "express";
import { getUserDataController } from "../controllers/userController.js";

const router = express.Router();

router.get("/", getUserDataController);

export default router;
