import helpers from './../utils/helpers';
export class ModuleTemplate {

  constructor(state, UICtrl) {
    this.state = state;
    this.UICtrl = UICtrl;
    // execute functions
    this.dom();
    this.events();
    this.render();
  }
  dom() {
    const { DOM} = this.UICtrl;
    // DOM listener
    DOM.addDOM(document.querySelector('#counter'), ["COUNT_UP", "COUNT_DOWN"]);
    DOM.addDOM(document.querySelector('#addbio'), [])
    this.$counter = document.querySelector('#counter');
    this.$bio = document.querySelector('#bio');
  }
  events() {
    let _state = this.state,
      _counter = this.$counter;
    let {Listener:event} = this.UICtrl;
    // if state changes
    document.addEventListener('state', (event) =>{
      // this will update everytime state is changed/ need a fix
      // event.detail = action used to trigger the state listener
      console.log('NODE strings', this.UICtrl.getNODEstrings());
      this.UICtrl.getNODEstrings().map((node) => {
        if (node.action.detail.indexOf(event.detail) !== -1) {
          this.$counter.innerHTML = this.state.counter
        }
      });
    });

    // i want to use my custom events in a Module template
    event.addListener('icon', 'click', () => console.log(this));
    event.addListener('#img', 'action', { detail: "COUNT_UP" });
    event.addListener('#img2', 'action', { detail: "COUNT_DOWN" });
  }

  // content to render
  render() {
    const {render, init} = this.UICtrl.DOM;
    render(
        `<div class"person">
          <h2>
            ${this.state.person.name} -
              <span class="job"> ${this.state.person.job}</span>
          </h2>
          <p class="location">${this.state.person.city}</p>
          <p class="bio">${this.state.person.bio}</p>
          <p> Learning from <a href="${this.state.person.links.wesbos}"> wes</a> and <a href="${this.state.person.links.academind}"> Max </a></p>
          <div>
            <h2>${this.state.beer.name}</h2>
            <p class="brewery">${this.state.beer.brewery}</p>
            ${helpers.renderList(this.state.beer.keywords)}
          </div
        </div>`, this.$bio);
    //this.$bio.insertAdjacentHTML(position = 'beforeend');
   init([
     document.querySelector('#counter')
   ]);
  }
}