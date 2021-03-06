//import 'whatwg-fetch';
import {store} from './utils/store';
import UIController from './controllers/uiController';
import baseController from './controllers/baseController';
//import APIController from './controllers/APIcontroller';
//import { Module } from './app/module';
//import {ModuleTemplate} from './app/moduleTemplate';
//import TestComponent from './components/testComponent';
//import { dropdown} from './components/FilterComponent';
//import selectToggle from './components/dropdown';
//import menuToggle from './components/menu';
//import YoutubeVideo from './components/YoutubeVideo';
// import HTML pages
//
//import dimensitions from './services.js/dimensions';
// import assets
//import app from './../scss/app.scss';

// GLOBAL APP CONTROLLER
const controller = (function (baseCtrl, UICtrl) {
 /*  let scrollByAction = Actions.scrollByAction(12);
  let eventObjects = UICtrl.getEventObjects;
  let getDOMstrings = UICtrl.getDOMstrings();
  const { Listener: event } = UICtrl
  event.addListener('.list-group-item', 'action', scrollByAction); */
  
  return {
    init: function () {
      console.log('Application has started.');
      // EXECUTE APP DEPENDENT FUNCTIONS FIRST
      //dimensitions();
      //baseCtrl.setActionListener();
      //APICtrl.setAPIlistener();
      // EXECUTE DOM COMPONENTS/MODULES
      // selectToggle();
      // menuToggle();
      //new FilterComponent(state, UICtrl);
      // console.log('DOMstrings', getDOMstrings);
      // EXECUTE API DEPENDENT FUNCTIONS HERE
      //APICtrl.getUsers();
      let sidebarInner = document.getElementsByClassName('timelineSidebar__inner');
      let sidebarContainer  = document.getElementsByClassName('timeline-card-wrapper');
      let timelineHeaderInner = document.getElementsByClassName('timeline-header__inner');
      let timelineSidebar = document.getElementById('timelineSidebar');
      let timelineHeader = document.getElementById('timeline-header');
 
      if(sidebarInner && sidebarContainer && timelineHeaderInner && timelineSidebar && timelineHeader){
        UICtrl.stickySidebar('#timelineSidebar', {
          topSpacing: 210,
          bottomSpacing: 1000,
          containerSelector: 'body',
          innerWrapperSelector: '.timelineSidebar__inner',
          resizeSensor: true,
        });
        UICtrl.stickySidebar('#timeline-header', {
          topSpacing: 65,
          bottomSpacing: 0,
          containerSelector: 'body',
          innerWrapperSelector: '.timeline-header__inner'
        });
      }
      // baseCtrl.saveLocalStorage(state);
      // EXECUTE DOM DEPENDENT FUNCTIONS LAST
     //UICtrl.setEventListeners(eventObjects);
      // // LAZY LOAD
      // UICtrl.lazyLoad();
      // // SIEMA
      // let pressedSiema = UICtrl.siema();
      // let setTimer = setInterval(() => pressedSiema.next(1), 7000);         
    }
  };

})(baseController, UIController);
// start Application
controller.init();

/*TODO
* Create an API controller
* Create a Module Template - model (how and what we display)
* UI Controller is managing state and events related to the UI
* BASE Controller is managting the overall app state/functions
*/

