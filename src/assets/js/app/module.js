
export default class Module {

    constructor(state, UICtrl) {
        this.state = state;
        this.UICtrl = UICtrl;
        this.events();
    }
    addDOM(domElement, actions=[]) {
        const { DOM } = this.UICtrl;
        DOM.addDOM(document.querySelector(domElement), actions);
        this.$domElement = document.querySelector(domElement);
    }
    events() {
        let _state = this.state;
        document.addEventListener('state', (event) => { 
            this.UICtrl.getDOMstrings().map((domString,index) => {
                console.log('event detail ', event.detail);
                console.log('domstring ', domString.actions[index]);
                for (let index = 0; index < domString.actions.length; index++) {
                    if (domString.actions[index].indexOf(event.detail.type) !== -1) {
                        domString.element.innerHTML = this.state.counter
                    }
                }
            });
        });
    }
    // content to render
    render(contentString,domElement) {
        const { render} = this.UICtrl.DOM;
        render(contentString, domElement);
    }
    init(initArray){
        const {init } = this.UICtrl.DOM;
        init(initArray);
    }
}