import cors from "cors";
import bodyParser from "body-parser";
import fs from "fs/promises";

import { configDotenv } from "dotenv";
import express from "express";

configDotenv();
const app = express();
const port = PORT || 5000;

const { PORT, BACKEND_URL, META_APP_ACCESS_TOKEN } = process.env;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("<p>Node.js Server is running</p>");
});

app.get("/api/privacy-policy", async (req, res) => {
  try {
    const privacyPolicyHtml = await fs.readFile("privacy-policy.html", "utf8");
    res.setHeader("Content-Type", "text/html");
    res.send(privacyPolicyHtml);
  } catch (error) {
    console.error("Error fetching privacy policy:", error);
    res.status(500).send("Internal Server Error");
  }
});

app
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

app.listen(PORT, () => {
  if (process.env.NODE_ENV !== "production") {
    console.log("Running in development mode");
    console.log(`Server is running at ${BACKEND_URL + ":" + port}`);
  } else {
    console.log("Running in production mode");
    console.log(`Server is running at ${BACKEND_URL}`);
  }
});
