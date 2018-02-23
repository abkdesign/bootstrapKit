const helpers = {};
helpers.renderList = (keywords, parentClass = null, childClass = null) =>{
  return (`<ul class${parentClass}>
        ${keywords.map(key => `<li ${childClass}>${key}</li>`).join('')}
      </ul>`);
}
let eventStrings = [
  {
    id: 1,
    element: '.add__type',
    type: 'click',
    listener: function (e) { console.log(this); }
  },
  {
    id: 2,
    element: '#email',
    type: 'input',
    listener: function (e) { console.log(this); }
  }
]
// create function that accepts an object and pushes it ot to the DOMstrings array
let Listener = {
  Listeners: eventStrings,
  lastId: eventStrings.length,
  addListener: function (element, type, listener) {
    this.Listeners.push({
      id: ++this.lastId,
      element: element,
      type: type,
      listener: listener
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
  }
}
/*
      this.UICtrl.getNODEstrings().map((node) => {
        if (node.action.detail.indexOf(event.detail) !== -1) {
          //document.querySelector(node.id);
          let DOMtarget = {
            "COUNT_DOWN": function () {
              return _counter.innerHTML = _state.counter;
            },
            'COUNT_UP': function () {
              return _counter.innerHTML = _state.counter;
            }
          };
          DOMtarget[event.detail]();
          console.log(node);
        }
      });
*/ 

// loop dom nodes
/*const loopNodes = UICtrl.getNODEstrings.map((node) => {
  if (node.action.detail.indexOf(event.detail) !== -1) {
    document.querySelector(node.id);
  }
});*/
export default helpers;