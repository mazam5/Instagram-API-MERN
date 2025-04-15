import express from "express";
import { configDotenv } from "dotenv";

configDotenv();
const router = express.Router();
const { BACKEND_URL } = process.env;
