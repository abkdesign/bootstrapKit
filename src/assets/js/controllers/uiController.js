import store from './../utils/store';
import Actions from './../actions/';
import Blazy from './../services.js/lazy';
import setSlideIndex from './../components/slider';
import StickySidebar from 'sticky-sidebar';
// UI CONTROLLER
const UIController = (function (state,Actions) {
  let _state = state;


  
  // EventObjects used to Create normal/CustomEventListners
  let eventObjects = [
    {
      id: 1,
      element: '.add__type',
      type: 'click',
      action: function (e) { console.log(this.id); }
    },
    {
      id: 2,
      element: '#buttonUp',
      eventType: 'action',
      action: Actions.countUpAction()
    },
    {
      id: 3,
      element: '#buttonDown',
      eventType: 'action',
      action: Actions.countDownAction()
    },
    {
      id: 4,
      element: '.list-group-item',
      eventType: 'action',
      action: Actions.scrollByAction(20)
    }];
  let DOMstrings = [];
  let NODEstrings = [];
  // Event Listner - action observers
  const Listener = {
    Listeners: eventObjects,
    lastId: eventObjects.length,
    addListener: function (element, type, action) {
      this.Listeners.push({
        id: ++this.lastId,
        element: element,
        eventType: type,
        action: action
      })
      return this.lastId
    },
    removeListener: function (id) {
      for (var i = this.Listeners.length - 1; i >= 0; i--) {
        this.Listeners[i]
        if (this.Listeners[i].id == id) {
          this.Listeners.splice(i, 1)
          return true
        }
      }
      return false
    },
    setupEventListeners: function (eventObjects) {
      return eventObjects.map((eventObject) => {
        // run through all nodes in the DOM with eventObject class
        console.log(eventObject);
        let nodes = document.querySelectorAll(eventObject.element)
        Array.from(nodes).forEach((node) => {
          // attach eventlistner to the current node in loop
          let fn;
          const eventTypes = {
            'action': function () {
              console.log(node);
              node.addEventListener('click', function (e) {
                document.dispatchEvent(new CustomEvent(eventObject.eventType, eventObject.action));
              });

            },
            'default': function () {
              // fix this
              return node.addEventListener(eventObject.eventType, eventObject.action);
            }
          };
          // if the eventType contains the type
          // passed in, let's use it
          if (eventTypes[eventObject.eventType]) {
            fn = eventTypes[eventObject.eventType];
            console.log('eventType');
            NODEstrings.push({
              listeneriId: eventObject.id,
              node: node,
              action: eventObject.action
            })
            console.log(NODEstrings);
            return fn()
          } else {
            // otherwise we'll assign the default
            fn = eventTypes['default'];
            console.log('default');
            return fn()
          }
        });
      })
    }
  };
  // DOM related listeners and manipulation
  const DOM = {
    DOMstrings: DOMstrings,
    lastId: DOMstrings.length,
    addDOM: function (element, actions) {
      this.DOMstrings.push({
        id: ++this.lastId,
        element: element,
        actions: actions
      })
      return this.lastId
    },
    removeDOM: function (id) {
      for (var i = this.DOMstrings.length - 1; i >= 0; i--) {
        this.DOMstrings[i]
        if (this.DOMstrings[i].id == id) {
          this.DOMstrings.splice(i, 1)
          return true
        }
      }
      return false
    },
    render: function (string, element) {
      let position = "beforeend";
      console.log(element);
      if (document.body.contains(element)){
        element.insertAdjacentHTML(position, string);
      }else{return}
    },
    init: function (elements) {
      console.log(state);
      elements.map((element) => {
        console.log('init element',element);
        if (document.body.contains(document.querySelector(element.DOMelement))){
          return document.querySelector(element.DOMelement).innerHTML = (element.state === null) ? '' : element.state;
        }else{ return} 
      })
    }
  };
  // Remember to use anonymous functions
  return {
    DOM: DOM,
    Listener: Listener,
    getDOMstrings: function () {
      return DOMstrings;
    },
    getNODEstrings: function () {
      return NODEstrings;
    },
    getEventObjects: function () {
      return eventObjects;
    },
    setEventListeners: function () {
      return Listener.setupEventListeners(eventObjects)
    },
    lazyLoad: function(){
      return window.bLazy = new Blazy({
        container: '.container--lazy',
        offset: 3000,
        success: function (element) {
          console.log("Element loaded: ", element.nodeName);
        }
      });
    },
    stickySidebar: function(element, options){
      return new StickySidebar(element, options);
    }
  };
})(store, Actions);

export default UIController;
