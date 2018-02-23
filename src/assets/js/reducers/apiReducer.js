 const userReducer = (state, action) =>  {
   switch (action.type) {
    case "UPDATE_USERS":
      return Object.assign(state, {
        users: action.users
      });
    default:
      return state;
  }
}
export {userReducer};