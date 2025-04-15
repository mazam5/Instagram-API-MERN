import express from "express";
import { configDotenv } from "dotenv";
import fs from "fs/promises";

configDotenv();
const router = express.Router();

router.get("/privacy-policy", async (req, res) => {
  try {
    const privacyPolicyHtml = await fs.readFile("privacy-policy.html", "utf8");
    res.setHeader("Content-Type", "text/html");
    res.send(privacyPolicyHtml);
  } catch (error) {
    console.error("Error fetching privacy policy:", error);
    res.status(500).send("Internal Server Error");
  }
});

router
  .route("/webhooks")
  .get((req, res) => {
    const hubMode = req.query["hub.mode"];
    const hubChallenge = req.query["hub.challenge"];
    const hubVerifyToken = req.query["hub.verify_token"];
    if (hubChallenge && hubVerifyToken) {
      res.status(200).send(hubChallenge);
    } else {
      res.send("<p>This is a GET Request, Hello Webhook!</p>");
    }
  })
  .post((req, res) => {
    const { object, entry } = req.body;
    if (object && entry) {
      console.log("Webhook received:", JSON.stringify(req.body, null, 2));
      res.status(200).send("Webhook received successfully");
    } else {
      res.status(400).send("Invalid webhook data");
    }
  });

export default router;
