/*TODO
 attach to the state/store data flow
*/
export const loadState = () => {
  //  use try to get state from  localstorage
  try {
    const serializedState = localStorage.getItem('state');
    if (serializedState === null) {
      return undefined;
    }
    return JSON.parse(serializedState);
  }
  catch (err) {
    return undefined;
  }
}

export const saveState = (state) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem('state', serializedState);

  } catch (err) {
    //ignore write errors
  }
};