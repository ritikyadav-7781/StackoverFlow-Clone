import React from "react";
import LeftSidebar from "../../components/LeftSidebar/LeftSidebar";
import RightSidebar from "../../components/RightSidebar/RightSidebar";

import "../../App.css";
import QuestionDetails from "./QuestionDetails";
function DisplayQuestion({ slideIn, handleSlideIn }) {
  return (
    <div className="home-container-1">
      <LeftSidebar slideIn={slideIn} handleSlideIn={handleSlideIn} />
      <div className="home-container-2">
        <QuestionDetails />
        <RightSidebar />
      </div>
    </div>
  );
}

export default DisplayQuestion;
