import helpers from './../utils/helpers';
import module from './../app/module';
import Actions from './../actions';
export default class TestComponent extends module{
  constructor(state, UICtrl){
    super(state, UICtrl)
    this.state = state;
    this.runParentMethods();
  }
  // parameters needed for parent function: domElement, actions, contentString, initArray
  runParentMethods(){
    const { Listener: event } = this.UICtrl,
          countUpAction = Actions.countUpAction(),
          countDownAction = Actions.countDownAction();
    const actions = [countDownAction.detail.type, countUpAction.detail.type],
          counterElement = '#counter',
          renderElement = document.querySelector('#bio'),
      initArray = [{ DOMelement: counterElement, state: this.state.counter}];
    // addDOM - is elements that are effected by the state/action eventlisteners
    super.addDOM(counterElement, actions);
    // display state for dom element
    super.init(initArray);   
    // Render html from javascript module - string and dom element
    super.render(`<div class"person">
          <h2>${this.state.person.name} -<span class="job"> ${this.state.person.job}</span></h2>
          <p class="location">${this.state.person.city}</p>
          <p class="bio">${this.state.person.bio}</p>
          <p> Learning from <a href="${this.state.person.links.wesbos}"> wes</a> and <a href="${this.state.person.links.academind}"> Max </a></p>
          <div>
            <h2>${this.state.beer.name}</h2>
            <p class="brewery">${this.state.beer.brewery}</p>
            ${helpers.renderList(this.state.beer.keywords)}
          </div
        </div>`, 
        renderElement); 

    // i want to use my custom events in a Module template
    event.addListener('#img', 'action', countUpAction);
    event.addListener('#img2', 'action', countDownAction);
  }

}