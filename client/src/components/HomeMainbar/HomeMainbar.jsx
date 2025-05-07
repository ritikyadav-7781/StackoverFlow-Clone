import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./HomeMainbar.css";
import QuestionList from "./QuestionList";
import { useSelector } from "react-redux";
function HomeMainbar() {
  const questionList = useSelector((state) => state.questionsReducer);

  const location = useLocation(); //gives path from url
  const user = 1;
  const navigate = useNavigate(); //to navigate to different routes
  const checkAuth = () => {
    if (user === null) {
      alert("Login or Signup to ask a question");
      navigate("/auth");
    } else {
      navigate("/askquestion");
    }
  };
  return (
    <div className="main-bar">
      <div className="main-bar-header">
        {location.pathname === "/" ? (
          <h1>Top Questions</h1>
        ) : (
          <h1>All Questions</h1>
        )}
        <button onClick={checkAuth} className="ask-btn">
          Ask Question
        </button>
      </div>
      <div>
        {questionList.data === null ? (
          <h1>Loading...</h1>
        ) : (
          <>
            <p>{questionList.data.length} Questions</p>
            <QuestionList questionList={questionList.data} />
          </>
        )}
      </div>
    </div>
  );
}

export default HomeMainbar;
