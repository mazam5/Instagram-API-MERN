import cors from "cors";
import { configDotenv } from "dotenv";
import express from "express";

configDotenv();

const { PORT, BACKEND_URL, META_APP_ACCESS_TOKEN } = process.env;
const app = express();
app.use(cors());
app.use(express.json());
const port = PORT || 5000;

app.get("/", (req, res) => {
  res.send("Server is running");
});

app.get("/api/privacy-policy", (req, res) => {
  res.setHeader("Content-Type", "text/html");
  res.sendFile("privacy-policy.html", { root: "." });
});

app.get("/api/webhook", (req, res) => {
  const { hub, mode, token } = req.query;
  if (hub && mode && token) {
    if (mode === "subscribe" && token === META_APP_ACCESS_TOKEN) {
      console.log("Webhook verified");
      res.status(200).send(hub.challenge);
    } else {
      console.log("Webhook verification failed");
      res.sendStatus(403);
    }
  } else {
    console.log("Invalid webhook request");
    res.sendStatus(400);
  }
});

app.post("/api/webhook", (req, res) => {
  const body = req.body;
  if (body.object) {
    if (body.entry) {
      console.log("Webhook received:", body);
      res.sendStatus(200);
    } else {
      console.log("No entry in webhook request");
      res.sendStatus(404);
    }
  } else {
    console.log("Invalid webhook request");
    res.sendStatus(400);
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
