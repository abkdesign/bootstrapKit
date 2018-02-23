/* IF NOT NEEDED REMOVE IMPORT FROM CONTROLLER*/

function contactForms(){
  let elements = document.getElementsByClassName('contact-form');
  let attributeName = 'contactForm';
  console.log('forms-elements ', elements);
  console.log('forms-elements ', elements.length);
  // get value form input var x = document.forms["myForm"]["fname"].value;
  let contactForms = [];
  for(let index = 0; index < elements.length; index++){
    let contactForm = elements[index].getAttribute('name') === attributeName;
    console.log('contstdgfghf');
    if(contactForm){
      contactForms.push(elements[index]);
    }
  }
  console.log(contactForms);
}
/*let elClasses = elements.map((element) => {
  console.log('gdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdf')
});*/
export{contactForms};