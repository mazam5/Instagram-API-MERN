import cors from "cors";
import express, { application } from "express";
import bodyParser from "body-parser";

import metaRoutes from "./routes/metaRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import mediaRoutes from "./routes/mediaRoutes.js";
import userDataRoutes from "./routes/userDataRoutes.js";
import commentsRoutes from "./routes/commentsRoutes.js";

import { configDotenv } from "dotenv";

configDotenv();
const app = express();

const { PORT, API_BASE } = process.env;

app.use(
  cors({
    origin: [
      "*",
      "http://localhost:5173",
      "https://instagram-api-mern.onrender.com",
      "https://azam-fe-insta-api.netlify.app",
    ],
  })
);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("<p>Node.js Server is running</p>");
});

app.use("/api", metaRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/media", mediaRoutes);
app.use("/api/userdata", userDataRoutes);
app.use("/api/comments", commentsRoutes);

app.listen(PORT, () => {
  if (process.env.NODE_ENV !== "production") {
    console.log("Running in development mode");
    console.log(`Server is running at ${API_BASE + ":" + PORT}`);
  } else {
    console.log("Running in production mode");
    console.log(`Server is running at ${API_BASE}`);
  }
});
