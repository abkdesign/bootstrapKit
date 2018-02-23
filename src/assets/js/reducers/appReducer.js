const toggleSelectReducer = (state, action) => {
  switch (action.type) {
    case "UPDATE_USERS":
      return Object.assign(state, {
        toggle: !action.toggle
      });
    default:
      return state;
  }
}
export { toggleSelectReducer };