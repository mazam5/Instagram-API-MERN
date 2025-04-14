import cors from "cors";
import { configDotenv } from "dotenv";
import express from "express";

configDotenv();

const { PORT, BACKEND_URL } = process.env;
const app = express();
app.use(cors());
app.use(express.json());
const port = PORT || 5000;

app.get("/", (req, res) => {
  res.send("Server is running");
});

app.listen(PORT, () => {
  if (process.env.NODE_ENV !== "production") {
    console.log("Running in development mode");
    console.log(`Server is running on port ${BACKEND_URL + ":" + port}`);
  } else {
    console.log("Running in production mode");
    console.log(`Server is running on port ${BACKEND_URL + ":" + port}`);
  }
});
