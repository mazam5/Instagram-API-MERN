import cors from "cors";
import { configDotenv } from "dotenv";
import express from "express";
import {
  instagramCallback,
  instagramLogin,
} from "./controllers/authController.js";

configDotenv();

const { PORT, BACKEND_URL } = process.env;
const app = express();
app.use(cors());
app.use(express.json());
const port = PORT || 5000;

app.get("/", (req, res) => {
  res.send("Server is running");
});

app.get("/api/privacy-policy", (req, res) => {
  res.sendFile("privacy-policy.html", { root: "./public" });
});

app.get("/api/webhook", (req, res) => {
  const hubMode = req.query["hub.mode"];
  const hubChallenge = req.query["hub.challenge"];
  const hubVerifyToken = req.query["hub.verify_token"];
  if (hubChallenge && hubMode) {
    if (
      hubMode === "subscribe" &&
      hubVerifyToken === process.env.WEBHOOK_VERIFY_TOKEN
    ) {
      console.log("WEBHOOK_VERIFIED");
      res.status(200).send(hubChallenge);
    } else {
      res.sendStatus(403);
    }
  }
});

app.post("/api/webhook", (req, res) => {
  console.log("Webhook received:", req.body);
  res.sendStatus(200);
});

// app.use("/api", authRoutes);
app.get("/api/auth/instagram", instagramLogin);
app.get("/api/auth/instagram/callback", instagramCallback);

app.listen(PORT, () => {
  if (process.env.NODE_ENV !== "production") {
    console.log("Running in development mode");
    console.log(`Server is running on port ${BACKEND_URL + ":" + port}`);
  } else {
    console.log("Running in production mode");
    console.log(`Server is running on port ${BACKEND_URL + ":" + port}`);
  }
});
