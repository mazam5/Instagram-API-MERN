import express from "express";
import { configDotenv } from "dotenv";
import fs from "fs/promises";
import { getPrivacyPolicy } from "../controllers/policyController.js";
import { getWebhook, postWebhook } from "../controllers/webhookController.js";

configDotenv();
const router = express.Router();

router.get("/privacy-policy", getPrivacyPolicy);

router.route("/webhooks").get(getWebhook).post(postWebhook);

export default router;
