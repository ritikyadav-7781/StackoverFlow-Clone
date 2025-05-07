export const themeReducer = (state = true, action) => {
  switch (action.type) {
    case "CHANGE_THEME":
      return action.payload;
    default:
      return state;
  }
};
