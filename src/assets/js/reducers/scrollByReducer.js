
const scrollByReducer = (state, action) => {
  switch (action.type) {
    case "SCROLLBY":
    console.log('scroll bY')
      return Object.assign(state, {
        offset:action.offset 
      });
    default:
      return state;
  }
}

// Reducer should be put into a big array
// create a combineReducer function
export default scrollByReducer;