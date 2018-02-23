
// add comment
export function getUsersAction (users) {
  return {
    detail: {
      type: "UPDATE_USERS",
      users: users,
      reducer: "userReducer"
    }
  }
}
