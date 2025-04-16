import cors from "cors";
import express from "express";
import bodyParser from "body-parser";
import path from "path";
import { fileURLToPath } from "url";

import metaRoutes from "./routes/metaRoutes.js";
import authRoutes from "./routes/authRoutes.js";

import { configDotenv } from "dotenv";

configDotenv();
const app = express();

const { PORT, API_BASE } = process.env;

app.use(
  cors({
    origin: "*",
    credentials: true,
  })
);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const port = PORT || 5000;

app.get("/", (req, res) => {
  res.send("<p>Node.js Server is running</p>");
});

app.use("/api", metaRoutes);
app.use("/api/auth", authRoutes);

// app.use(express.static(path.join(__dirname, "dist"))); // or 'build' for CRA

// app.get("*", (req, res) => {
//   res.sendFile(path.join(__dirname, "dist", "index.html")); // fallback route
// });

app.listen(PORT, () => {
  if (process.env.NODE_ENV !== "production") {
    console.log("Running in development mode");
    console.log(`Server is running at ${API_BASE + ":" + port}`);
  } else {
    console.log("Running in production mode");
    console.log(`Server is running at ${API_BASE}`);
  }
});
