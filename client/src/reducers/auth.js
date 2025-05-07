const authReducer = (state = { data: null }, action) => {
  switch (action.type) {
    case "AUTH":
      localStorage.setItem("Profile", JSON.stringify({ ...action?.data })); //?: is data exist give data
      return { ...state, data: action?.data }; //...state: so far state
    case "LOGOUT":
      localStorage.clear();
      return { ...state, data: null };
    default:
      return state;
  }
}; //state: data passed
export default authReducer;
