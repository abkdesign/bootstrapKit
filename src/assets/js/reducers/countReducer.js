
const countReducer = (state, action) => {
  switch (action.type) {
    case "COUNT_UP":
      return Object.assign(state, {
        counter: state.counter += 1
      });
    case "COUNT_DOWN":
      return Object.assign(state, {
        counter: state.counter -= 1
      });
    default:
      return state;
  }
}

// Reducer should be put into a big array
// create a combineReducer function
export default countReducer;