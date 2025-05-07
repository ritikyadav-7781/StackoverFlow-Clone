import mongoose from "mongoose";
import questions from "../models/questions.js";

export const postAnswer = async (req, res) => {
  const { id: _id } = req.params; //post/id is params in url and we are just checking id part from it.
  const { noOfAnswers, answerbody, userAnswered, userId } = req.body;
  if (!mongoose.Types.ObjectId.isValid(_id)) {
    return res.status(404).send("Question unavailable...");
  }
  updateNoOfAnswers(_id, noOfAnswers);
  try {
    const updatedQuestion = await questions.findByIdAndUpdate(_id, {
      $addToSet: { answer: [{ answerbody, userAnswered, userId }] },
    });
    res.status(200).json(updatedQuestion);
  } catch (error) {
    res.status(400).json("error in updating");
  }
};

const updateNoOfAnswers = async (_id, noOfAnswers) => {
  try {
    await questions.findByIdAndUpdate(_id, {
      $set: { noOfAnswers: noOfAnswers },
    });
  } catch (error) {
    console.log(error);
  }
};

export const deleteAnswer = async (req, res) => {
  const { id: _id } = req.params;
  const { answerId, noOfAnswers } = req.body;
  if (!mongoose.Types.ObjectId.isValid(_id)) {
    return res.status(404).send("Question unavailable...");
  }
  if (!mongoose.Types.ObjectId.isValid(answerId)) {
    return res.status(404).send("Answer unavailable...");
  }

  updateNoOfAnswers(_id, noOfAnswers);
  try {
    await questions.updateOne(
      { _id },
      { $pull: { answer: { _id: answerId } } }
    );
    res.status(200).json({ message: "Successfully Deleted.." });
  } catch (error) {
    res.status(405).json(error);
  }
};
