import React, { useState } from "react";
import { useParams, Link, useNavigate, useLocation } from "react-router-dom"; //useParams: to get id value from url
import { useSelector, useDispatch } from "react-redux";
import moment from "moment"; //to format time
import copy from "copy-to-clipboard";

import upvote from "../../assets/sort-up.svg";
import downvote from "../../assets/sort-down.svg";
import "./Questions.css";
import Avatar from "../../components/Avatar/Avatar";
import DisplayAnswers from "./DisplayAnswers";
import {
  deleteQuestion,
  postAnswer,
  voteQuestion,
} from "../../actions/question";
const QuestionDetails = () => {
  const { id } = useParams();
  const questionList = useSelector((state) => state.questionsReducer);

  const [answer, setAnswer] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  // const url = "https://stackoverflow-clone-tiwu.onrender.com";
  const url = "http://localhost:5000";
  const User = useSelector((state) => state.currentUserReducer);
  const handlePostAnswer = (e, answerlength) => {
    e.preventDefault();
    if (User === null) {
      alert("Login or Signup to answer a question.");
    } else {
      if (answer === "") {
        alert("Enter an answer before submitting..");
      } else {
        dispatch(
          postAnswer({
            id,
            noOfAnswers: answerlength + 1,
            answerbody: answer,
            userAnswered: User.result.name,
            userId: User.result._id,
          })
        );
      }
    }
  };

  const handleShare = () => {
    copy(url + location.pathname);
    alert("Copied url : " + url + location.pathname);
  };

  const handleDelete = () => {
    dispatch(deleteQuestion(id, navigate));
  };

  const handleUpVote = () => {
    dispatch(voteQuestion(id, "upVote", User.result._id));
  };

  const handleDownVote = () => {
    dispatch(voteQuestion(id, "downVote", User.result._id));
  };

  const theme = useSelector((state) => state.themeReducer);
  return (
    <div className="question-details-page">
      {questionList.data === null ? (
        <h1>Loading...</h1>
      ) : (
        questionList.data
          .filter((question) => question._id === id)
          .map((question) => (
            <div key={question._id}>
              <section className="question-details-container">
                <h1>{question.questionTitle}</h1>
                <div className="question-details-container-2">
                  <div className="question-votes">
                    <img
                      className="votes-icon"
                      src={upvote}
                      alt=""
                      width="18"
                      onClick={handleUpVote}
                    />
                    <p>{question.upVote.length - question.downVote.length}</p>
                    <img
                      className="votes-icon"
                      src={downvote}
                      alt=""
                      width="18"
                      onClick={handleDownVote}
                    />
                  </div>
                  <div style={{ width: "100%" }}>
                    <p className="question-body">{question.questionBody}</p>
                    <div className="question-details-tags">
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
                    <div className="question-action-user">
                      <div>
                        <button type="button" onClick={handleShare}>
                          Share
                        </button>
                        {/* if the id of user logged in matches the id from which the question is asked only then delete option is visible */}
                        {User?.result?._id === question?.userId && (
                          <button type="button" onClick={handleDelete}>
                            Delete
                          </button>
                        )}
                      </div>
                      <div>
                        {/* current time - this time */}
                        <p>asked {moment(question.askedOn).fromNow()}</p>
                        <Link
                          to={`/users/${question.userId}`}
                          className="user-link"
                          state={{ color: "#0086d8" }}
                        >
                          <Avatar backgroundColor="orange" px="8px" py="5px">
                            {question.userPosted.charAt(0).toUpperCase()}
                          </Avatar>
                          <div>{question.userPosted}</div>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
              {question.noOfAnswers !== 0 && (
                <section>
                  <h3>{question.noOfAnswers} Answers</h3>
                  <DisplayAnswers
                    key={question._id}
                    question={question}
                    handleShare={handleShare}
                  />
                </section>
              )}
              <section className="post-answer-container">
                <h3>Your Answer</h3>
                <form
                  onSubmit={(e) => {
                    handlePostAnswer(e, question.answer.length);
                  }}
                >
                  <textarea
                    name=""
                    id=""
                    cols="30"
                    rows="10"
                    onChange={(e) => setAnswer(e.target.value)}
                    style={{ backgroundColor: !theme && "#313030" }}
                  ></textarea>
                  <input
                    type="submit"
                    className="post-ans-btn"
                    value="Post your Answer"
                  />
                </form>
                <p>
                  Browse other Question tagged
                  {question.questionTags.map((tag) => (
                    <Link
                      to={"/tags"}
                      key={tag}
                      className="ans-tags"
                      style={{
                        backgroundColor: !theme && "#3c4851",
                        color: !theme && "#85c0c1",
                      }}
                    >
                      {tag}
                    </Link>
                  ))}
                  or
                  {
                    <Link
                      to={"/askquestion"}
                      style={{ textDecoration: "none", color: "#009dff" }}
                    >
                      {" "}
                      ask Your own Question
                    </Link>
                  }
                </p>
              </section>
            </div>
          ))
      )}
    </div>
  );
};

export default QuestionDetails;
