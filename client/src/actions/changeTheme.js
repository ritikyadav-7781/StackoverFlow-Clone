export const changeTheme = (theme) => async (dispatch) => {
  dispatch({ type: "CHANGE_THEME", payload: theme });
};
