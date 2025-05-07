import express from "express";
import auth from "../middlewares/auth.js";
import { postAnswer, deleteAnswer } from "../controllers/Answers.js";

const router = express.Router();

router.patch("/post/:id", auth, postAnswer); //patch: update a record in database

router.patch("/delete/:id", auth, deleteAnswer);
export default router;
