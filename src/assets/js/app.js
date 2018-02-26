import "babel-polyfill";
import 'whatwg-fetch';
import 'custom-event-polyfill';
import {store} from './utils/store';
import UIController from './controllers/uiController';
import baseController from './controllers/baseController';
import APIController from './controllers/APIcontroller';
//import { Module } from './app/module';
//import {ModuleTemplate} from './app/moduleTemplate';
import TestComponent from './components/testComponent';
import { dropdown} from './components/FilterComponent';
import selectToggle from './components/dropdown';
import menuToggle from './components/menu';
//import YoutubeVideo from './components/YoutubeVideo';
// import HTML pages
//
import dimensitions from './services.js/dimensions';
// import assets
import app from './../scss/app.scss';

// GLOBAL APP CONTROLLER
const controller = (function (baseCtrl, UICtrl, APICtrl,state) {

  let eventObjects = UICtrl.getEventObjects;
  let getDOMstrings = UICtrl.getDOMstrings();

  
  return {
    init: function () {
      console.log('Application has started.');
      // EXECUTE APP DEPENDENT FUNCTIONS FIRST
      //dimensitions();

      baseCtrl.setActionListener();
      //APICtrl.setAPIlistener();
      // EXECUTE DOM COMPONENTS/MODULES
      selectToggle();
      menuToggle();
      //new FilterComponent(state, UICtrl);
      console.log('DOMstrings', getDOMstrings);
      // EXECUTE API DEPENDENT FUNCTIONS HERE
      APICtrl.getUsers();
      baseCtrl.saveLocalStorage(state);
      // EXECUTE DOM DEPENDENT FUNCTIONS LAST
      UICtrl.setEventListeners(eventObjects);
      // LAZY LOAD
      UICtrl.lazyLoad();
      // SIEMA
      let pressedSiema = UICtrl.siema();
      let setTimer = setInterval(() => pressedSiema.next(1), 7000);         
    }
  };

})(baseController, UIController, APIController,store);
// start Application
controller.init();

/*TODO
* Create an API controller
* Create a Module Template - model (how and what we display)
* UI Controller is managing state and events related to the UI
* BASE Controller is managting the overall app state/functions
*/
