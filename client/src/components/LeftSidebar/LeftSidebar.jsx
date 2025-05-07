import React from "react";
import { NavLink } from "react-router-dom";
import "./LeftSidebar.css";
import Globe from "../../assets/Globe.svg";
import { useSelector } from "react-redux";

const LeftSidebar = ({ slideIn, handleSlideIn }) => {
  const theme = useSelector((state) => state.themeReducer);
  const slideInStyle = {
    transform: "translateX(0%)",
    backgroundColor: theme && "white",
  };

  const slideOutStyle = {
    transform: "translateX(-100%)",
  };
  return (
    <div
      className="left-sidebar"
      style={slideIn ? slideInStyle : slideOutStyle}
    >
      <nav
        className="side-nav"
        style={{ backgroundColor: !theme && "#313030" }}
      >
        <button onClick={() => handleSlideIn()} className="nav-btn">
          <NavLink
            to="/"
            className="side-nav-links"
            activeclassname="active"
            style={{ color: !theme && "#e6e8eb" }}
          >
            <p>Home</p>
          </NavLink>
        </button>
        <div className="side-nav-div">
          <div>
            <p>PUBLIC</p>
          </div>
          <button onClick={() => handleSlideIn()} className="nav-btn">
            <NavLink
              to="/Questions"
              className="side-nav-links"
              activeclassname="active"
              style={{ color: !theme && "#e6e8eb" }}
            >
              <img src={Globe} alt="Globe" />
              <p style={{ paddingLeft: "10px" }}> Questions </p>
            </NavLink>
          </button>
          <button onClick={() => handleSlideIn()} className="nav-btn">
            <NavLink
              to="/Tags"
              className="side-nav-links"
              activeclassname="active"
              style={{ paddingLeft: "40px", color: !theme && "#e6e8eb" }}
            >
              <p>Tags</p>
            </NavLink>
          </button>
          <button onClick={() => handleSlideIn()} className="nav-btn">
            <NavLink
              to="/Users"
              className="side-nav-links"
              activeclassname="active"
              style={{ paddingLeft: "40px", color: !theme && "#e6e8eb" }}
            >
              <p>Users</p>
            </NavLink>
          </button>
        </div>
      </nav>
    </div>
  );
};

export default LeftSidebar;
