// import store from './../utils/store';
import StickySidebar from 'sticky-sidebar';
// UI CONTROLLER
const UIController = (function () {
  
  // Remember to use anonymous functions
  return {

    stickySidebar: function(element, options){
      return new StickySidebar(element, options);
    }
  };
})();

export default UIController;
