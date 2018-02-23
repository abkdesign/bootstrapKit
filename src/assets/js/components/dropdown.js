export default function selectToggle() {
  let selectElements = document.getElementsByClassName('filter-component__select');
  for (let i = 0; i < selectElements.length; i++) {
    selectElements[i].addEventListener('click', (event) => {
      event.stopPropagation();
      if (event.target === selectElements[i].children[1] || event.target === selectElements[i].children[0] || event.target === selectElements[i]){
        selectElements[i].children[1].classList.toggle("is-collapsed");
        console.log('event', event.target, selectElements[0]);
      }
    })
   
  }
}