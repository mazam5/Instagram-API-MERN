import express from "express";
import {
  getAllRepliesToComment,
  getCommentsByMediaId,
  postReplyToComment,
} from "../controllers/commentsController.js";

const router = express.Router();

router.get("/", getCommentsByMediaId);
router.route("/replies").get(getAllRepliesToComment).post(postReplyToComment);

export default router;
