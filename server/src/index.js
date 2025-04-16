import cors from "cors";
import express from "express";
import bodyParser from "body-parser";

import metaRoutes from "./routes/metaRoutes.js";
import instagramRoutes from "./routes/instagramRoutes.js";

import { configDotenv } from "dotenv";

configDotenv();
const app = express();

const { PORT, BACKEND_URL } = process.env;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const port = PORT || 5000;

app.get("/", (req, res) => {
  res.send("<p>Node.js Server is running</p>");
});

app.use("/api", metaRoutes);
app.use("/api/auth", instagramRoutes);

app.listen(PORT, () => {
  if (process.env.NODE_ENV !== "production") {
    console.log("Running in development mode");
    console.log(`Server is running at ${BACKEND_URL + ":" + port}`);
  } else {
    console.log("Running in production mode");
    console.log(`Server is running at ${BACKEND_URL}`);
  }
});
