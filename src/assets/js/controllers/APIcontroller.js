import {store} from './../utils/store';
import Api from './../utils/api';
import Reducers from './../reducers/';
import Actions from './../actions/';
// API CONTROLLER
const APIController = (function (Api, state, Reducers, Actions) {
  console.log(Actions);
  const getUsers = () =>{
    console.log(Actions);
    return Api.runFetch('users', 'GET').then((responseJson) => {
      let users = responseJson
      document.dispatchEvent(
        new CustomEvent('API', Actions.getUsersAction(users))
      );
    })
  }
  const getUser = () => {
    return Api.runFetch('users', 'GET').then((responseJson) => {
      let users = responseJson
      return users.reduce(function (user) { // Map through the results and for each run the code below
        document.dispatchEvent(
          new CustomEvent('API', {
            detail: user
          })
        );
        return user
      })
    })
  }
  function updateUser(selectedUser, updatedData) {
    return Api.runFetch(`users/${selectedUser}`, 'put',updatedData).then((responseJson) => {
      console.log(responseJson);
    })
  }
  /* this is the right way to do it*/
  function getPassword(selectedPassword) {
    return Api.runFetch('passwords', 'GET').then((responseJson) => {
      let passwords = responseJson
      return passwords.reduce(function (password) { // Map through the results and for each run the code below
        console.log(password.userId, password.password);
        if (password.userId === selectedPassword) {
          return password;
        }
      })
    })
  }
  /* this is the right way to do it*/
  Api.run(function* () {
    const inputPassword = 1;
    const posts = yield getPassword(inputPassword);
    console.log('run generator returns: ', posts);
  })
  return{
    getUsers,
    setAPIlistener: function () {
      document.addEventListener('API', (event) => {
        // Run middleware before reducers
        // Run reducers
        console.log('ACTION: ',event.detail);
        state = Reducers[event.detail.reducer](state, event.detail);
        // Dispatch API event
        console.log('API event changed', state);
        document.dispatchEvent(
          new CustomEvent('state', event)
        );
      });
    }
  }
})(Api, store, Reducers, Actions)

export default APIController;