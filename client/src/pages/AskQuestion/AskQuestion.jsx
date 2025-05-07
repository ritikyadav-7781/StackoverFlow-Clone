import React, { useState } from "react"; // without parentheses import default import, with parantheses import is individual import
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { askQuestion } from "../../actions/question";
import "./AskQuestion.css";

const AskQuestion = () => {
  const [questionTitle, setQuestionTitle] = useState("");
  const [questionBody, setQuestionBody] = useState("");
  const [questionTags, setQuestionTags] = useState("");

  const dispatch = useDispatch();
  const user = useSelector((state) => state.currentUserReducer);
  const theme = useSelector((state) => state.themeReducer);
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(
      askQuestion(
        {
          questionTitle,
          questionBody,
          questionTags,
          userPosted: user.result.name,
          userId: user.result._id,
        },
        navigate
      )
    );
  };

  const handleEnter = (e) => {
    if (e.key === "Enter") {
      setQuestionBody(questionBody + "\n");
    }
  }; //to handle if user enters Enter key it will not be displayed disoriented.
  return (
    <div
      className="ask-question"
      style={{ backgroundColor: !theme && "#313030" }}
    >
      <div className="ask-question-container">
        <h1>Ask a public Question</h1>
        <form onSubmit={handleSubmit}>
          <div
            className="ask-form-container"
            style={{ backgroundColor: !theme && "#222121" }}
          >
            <label htmlFor="ask-ques-title">
              <h4>Title</h4>
              <p>
                Be specific and imagine you are asking a question to another
                person.
              </p>
              <input
                type="text"
                id="ask-ques-title"
                onChange={(e) => {
                  setQuestionTitle(e.target.value);
                }}
                style={{
                  backgroundColor: !theme && "#313030",
                  color: !theme && "#fff",
                }}
                placeholder="e.g. Is there an R function for finding the index of an element in a vector?"
              />
            </label>
            <label htmlFor="ask-ques-body">
              <h4>Body</h4>
              <p>
                Include all the information someone would need to answer your
                question.
              </p>
              <textarea
                id="ask-ques-body"
                cols="30"
                rows="10"
                onChange={(e) => {
                  setQuestionBody(e.target.value);
                }}
                onKeyDown={handleEnter}
                style={{
                  backgroundColor: !theme && "#313030",
                  color: !theme && "#fff",
                }}
              ></textarea>
            </label>
            <label htmlFor="ask-ques-tags">
              <h4>Tags</h4>
              <p>Add upto 5 tags to describe what your question is about</p>
              <input
                type="text"
                id="ask-ques-tags"
                onChange={(e) => {
                  setQuestionTags(e.target.value.split(" "));
                }}
                style={{
                  backgroundColor: !theme && "#313030",
                  color: !theme && "#fff",
                }}
                placeholder="e.g. 
              (xml typescript wordpress)"
              />
            </label>
          </div>
          <input
            type="submit"
            value="Review your question"
            className="review-btn"
          />
        </form>
      </div>
    </div>
  );
};

export default AskQuestion;
