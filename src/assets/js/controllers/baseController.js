import { store, initializeState, localStorage} from './../utils/store';
import Reducers from './../reducers/';
import {contactForms} from './../app/modules/form';
// BASE CONTROLLER
const baseController = (function (Reducers, state,localStorage) {
  return {
    saveLocalStorage: function(newState){
      localStorage(newState)
    },
    setActionListener: function () {
      contactForms();
      // CUSTOM eventListener ACTION - reducer - state
      document.addEventListener('action', function (action) {
        // Run middleware before Reducer
        // Run Reducers
        state = Reducers[action.detail.reducer](state, action.detail);
        console.log('state changed', state);
        // Dispatch Action
        console.log(action);
        document.dispatchEvent(
          new CustomEvent('state', action)
        );
      }, false);
    },
    youtube: function(){
      // 2. This code loads the IFrame Player API code asynchronously.
      var tag = document.createElement('script');

      tag.src = "https://www.youtube.com/iframe_api";
      var firstScriptTag = document.getElementsByTagName('script')[0];
      firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

      // 3. This function creates an <iframe> (and YouTube player)
      //    after the API code downloads.
      var player;
    }
  };
})(Reducers, store,  localStorage);
export default baseController;