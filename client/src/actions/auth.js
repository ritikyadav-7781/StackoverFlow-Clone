import * as api from "../api";
import { setCurrentUser } from "./currentUser";
export const signup = (authData, navigate) => async (dispatch) => {
  try {
    const { data } = await api.signup(authData);
    dispatch({ type: "AUTH", data });
    dispatch(setCurrentUser(JSON.parse(localStorage.getItem("Profile"))));
    navigate("/");
  } catch (error) {
    console.log(error);
  }
};
export const login = (authData, navigate) => async (dispatch) => {
  try {
    const { data } = await api.login(authData);
    dispatch({ type: "AUTH", data });
    dispatch(setCurrentUser(JSON.parse(localStorage.getItem("Profile"))));
    navigate("/");
  } catch (error) {
    alert(error.response.data.message);
  }
};

//async and await works together, part of asynchronous js programming, with async we dont have to run the functions step by step, we can run them in any particular order.
// await ensures that prog will wait for the funtion with await to fully execute and then call the next one.
