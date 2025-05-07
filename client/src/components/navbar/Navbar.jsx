import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import decode from "jwt-decode";

import logo from "../../assets/logo.png";
import logoDark from "../../assets/logoDark2.png";
import search from "../../assets/search-solid.svg";
import Avatar from "../../components/Avatar/Avatar";
import bars from "../../assets/bars-solid.svg";
import darkBars from "../../assets/bars-solid-dark.svg";
import "./Navbar.css";
import { setCurrentUser } from "../../actions/currentUser";
import { changeTheme } from "../../actions/changeTheme";

function Navbar({ handleSlideIn }) {
  var user = useSelector((state) => state.currentUserReducer);
  const users = useSelector((state) => state.usersReducer);
  const currentProfile = users.filter(
    (myUser) => myUser._id === user?.result?._id
  )[0];
  const theme = useSelector((state) => state.themeReducer);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    const token = user?.token;
    if (token) {
      const decodeToken = decode(token);
      if (decodeToken.exp * 1000 < new Date().getTime()) {
        handleLogout();
      }
    }
    dispatch(setCurrentUser(JSON.parse(localStorage.getItem("Profile"))));
    // eslint-disable-next-line
  }, [user?.token, dispatch]); // as soon as the page is refreshed the action to set the user is called again and user is not automatically logged out.

  const handleLogout = () => {
    dispatch({ type: "LOGOUT" });
    navigate("/");
    dispatch(setCurrentUser(null));
  };

  const reverseTheme = () => {
    if (theme) dispatch(changeTheme(false));
    else dispatch(changeTheme(true));
  };
  return (
    <nav
      className="nav-main"
      style={{
        backgroundColor: !theme && "#2c2c2d",
      }}
    >
      <div className="navbar">
        <button className="slide-in-icon" onClick={() => handleSlideIn()}>
          <img src={theme ? bars : darkBars} alt="bars" width="15" />
        </button>
        <div className="navbar-1">
          <Link to="/" className="nav-item nav-logo">
            <img src={theme ? logo : logoDark} alt="logo" />
          </Link>
          <Link
            to="/"
            className="nav-item nav-btn-up res-nav"
            style={{
              color: theme ? "#2d2c2c" : "#e7e9e5",
            }}
          >
            About
          </Link>
          <Link
            to="/"
            className="nav-item nav-btn-up res-nav"
            style={{ color: theme ? "#2d2c2c" : "#e7e9e5" }}
          >
            Products
          </Link>
          <Link
            to="/"
            className="nav-item nav-btn-up res-nav"
            style={{ color: theme ? "#2d2c2c" : "#e7e9e5" }}
          >
            For Teams
          </Link>
          <Link
            to="/customvideo"
            className="nav-item nav-btn-up video"
            style={{
              color: theme ? "#2d2c2c" : "#e7e9e5",
            }}
          >
            Video
          </Link>
          <Link
            className="nav-item nav-btn-up video"
            onClick={reverseTheme}
            style={{
              color: theme ? "#2d2c2c" : "#e7e9e5",
            }}
          >
            {theme ? "Dark" : "Light"}
          </Link>
          <form>
            <input type="text" placeholder="Search..." />
            <img src={search} alt="search" width="18" className="search-icon" />
          </form>
        </div>
        <div className="navbar-2">
          {user === null ? (
            <Link to="/auth" className="nav-item log-btn">
              Log-In
            </Link>
          ) : currentProfile?.profileImage ? (
            <>
              <Link to={`/user/${user?.result?._id}`}>
                <img
                  style={{
                    width: "35px",
                    height: "35px",
                    borderRadius: "50%",
                    marginLeft: "10px",
                  }}
                  src={currentProfile.profileImage}
                  alt="profile"
                ></img>
              </Link>
              <button
                className="nav-item nav-links log-btn"
                onClick={handleLogout}
              >
                Log-Out
              </button>
            </>
          ) : (
            <>
              <Avatar
                backgroundColor="#009dff"
                px="10px"
                py="7px"
                borderRadius="50%"
                color="white"
              >
                <Link
                  to={`/user/${user?.result?._id}`}
                  style={{ color: "white", textDecoration: "none" }}
                >
                  {user.result.name.charAt(0).toUpperCase()}
                </Link>
              </Avatar>
              <button
                className="nav-item nav-links log-btn"
                onClick={handleLogout}
              >
                Log-Out
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
