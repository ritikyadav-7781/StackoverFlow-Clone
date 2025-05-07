//iterating all questions from database according to format given in Questions component

import React from "react";
import Questions from "./Questions";
function QuestionList({ questionList }) {
  return (
    <>
      {questionList.map((question) => (
        <Questions question={question} key={question._id} />
      ))}
    </>
  );
}

export default QuestionList;
