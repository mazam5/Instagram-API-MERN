import cors from "cors";
import bodyParser from "body-parser";
import metaRoutes from "./routes/metaRoutes.js";
import authRoutes from "./routes/authRoutes.js";

import { configDotenv } from "dotenv";
import express from "express";

configDotenv();
const app = express();

const { PORT, BACKEND_URL, META_APP_ACCESS_TOKEN } = process.env;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const port = PORT || 5000;

app.get("/", (req, res) => {
  res.send("<p>Node.js Server is running</p>");
});

app.use("/api", metaRoutes);
app.use("/api/auth", authRoutes);

app.listen(PORT, () => {
  if (process.env.NODE_ENV !== "production") {
    console.log("Running in development mode");
    console.log(`Server is running at ${BACKEND_URL + ":" + port}`);
  } else {
    console.log("Running in production mode");
    console.log(`Server is running at ${BACKEND_URL}`);
  }
});
