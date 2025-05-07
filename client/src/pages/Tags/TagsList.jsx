import React from "react";
import { useSelector } from "react-redux";

import "./Tags.css";
const TagsList = ({ tag }) => {
  const theme = useSelector((state) => state.themeReducer);
  return (
    <div className="tag">
      <h5
        style={{
          backgroundColor: !theme && "#3c4851",
          color: !theme && "#85c0c1",
        }}
      >
        {tag.tagName}
      </h5>
      <p style={{ color: !theme && "#c4d2b7" }}>{tag.tagDesc}</p>
    </div>
  );
};

export default TagsList;
