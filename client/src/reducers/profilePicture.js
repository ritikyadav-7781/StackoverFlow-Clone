const imageReducer = (state = { data: null }, action) => {
  switch (action.type) {
    case "UPDATE_PROFILE_PICTURE":
      return { ...state };
    default:
      return state;
  }
};
export default imageReducer;
