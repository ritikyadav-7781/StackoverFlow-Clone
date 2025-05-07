//question formatting in orange colour

import React from "react";
import { Link } from "react-router-dom";
import moment from "moment";
import { useSelector } from "react-redux";

function Questions({ question }) {
  const theme = useSelector((state) => state.themeReducer);
  return (
    <div
      className="display-question-container"
      style={{ backgroundColor: !theme && "#393838" }}
    >
      <div className="display-votes-ans">
        <p>{question.upVote.length - question.downVote.length}</p>
        <p>votes</p>
      </div>
      <div className="display-votes-ans">
        <p>{question.noOfAnswers}</p>
        <p>answers</p>
      </div>
      <div className="display-question-details">
        <Link to={`/questions/${question._id}`} className="question-title-link">
          {question.questionTitle}
        </Link>

        <div className="display-tags-time">
          <div className="display-tags">
            {question.questionTags.map((tag) => (
              <p
                key={tag}
                style={{
                  backgroundColor: !theme && "#3c4851",
                  color: !theme && "#85c0c1",
                }}
              >
                {tag}
              </p>
            ))}
          </div>
          <div className="display-time">
            <p>
              asked {moment(question.askedOn).fromNow()} {question.userPosted}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Questions;
