import React from "react";
import { useSelector } from "react-redux";

import "./RightSidebar.css";
function WidgetTags() {
  const tags = [
    "c",
    "css",
    "express",
    "firebase",
    "html",
    "java",
    "javascript",
    "mern",
    "mongodb",
    "mysql",
    "next.js",
    "node.js",
    "php",
    "python",
    "reactjs",
  ];
  const theme = useSelector((state) => state.themeReducer);
  return (
    <div className="widget-tags">
      <h4 style={{ backgroundColor: !theme && "#393838" }}>watched tags</h4>
      <div className="widget-tags-div">
        {tags.map((tag) => (
          <p
            style={{
              backgroundColor: !theme && "#3c4851",
              color: !theme && "#85c0c1",
            }}
            key={tag}
          >
            {tag}
          </p>
        ))}
      </div>
    </div>
  );
}

export default WidgetTags;
