import { HashRouter as Router } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

import Navbar from "./components/navbar/Navbar";
import AllRoutes from "./AllRoutes";
import { fetchAllQuestions } from "./actions/question";
import { fetchAllUsers } from "./actions/users";
import { changeTheme } from "./actions/changeTheme";

function App() {
  const dispatch = useDispatch();

  // dispatch(getImage(user.result._id));

  //getting time to change theme accordingly
  const today = new Date();
  const time = today.getHours();

  const [slideIn, setSlideIn] = useState(
    window.innerWidth > 760 ? true : false
  );
  useEffect(() => {
    if (window.innerWidth <= 760) {
      setSlideIn(false);
    }
    dispatch(fetchAllQuestions());
    dispatch(fetchAllUsers());

    if (time >= 20 || time <= 6) {
      dispatch(changeTheme(false));
    }
  }, [dispatch, time]);

  const handleSlideIn = () => {
    if (window.innerWidth <= 760) {
      setSlideIn((state) => !state);
    }
  };
  return (
    <div className="App">
      <Router>
        <Navbar handleSlideIn={handleSlideIn} />
        <AllRoutes slideIn={slideIn} handleSlideIn={handleSlideIn} />
      </Router>
    </div>
  );
}
export default App;
