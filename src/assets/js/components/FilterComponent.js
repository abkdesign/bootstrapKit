export function filterToggle() {
 console.log('toggle');
  var element = document.getElementsByClassName('filter-component__dropdown');

  if (element.classList) {
    element.classList.toggle("is-collapsed");
  } else {
    var classes = element.className.split(" ");
    var i = classes.indexOf("is-collapsed");

    if (i >= 0)
      classes.splice(i, 1);
    else
      classes.push("is-collapsed");
    element.className = classes.join(" ");
  }
}
export function selectToggle(){
  document.getElementsByClassName('filter-component__selectTopic').addEventListener('click', ()=> console.log('im clicking'))
  const dropdown = (triggerNote) => {
    console.log('ttogle', triggerNote);
    //var menu = this.querySelectorAll('.filter-component__dropdown');
    triggerNote.classList.toggle("is-collapsed");
  };
  
  console.log('init toggle')
  let select = document.querySelectorAll('.filter-component__select');
  for (let i = 0; i < select.length; i++) {
    console.log(select[i]);
    console.log(i);
    for (let nodeIndex = 0; nodeIndex < select[i].children.length; nodeIndex++) {
      console.log(nodeIndex, select[i].children);
      if (select[i].children[nodeIndex].classList.contains("filter-component__dropdown")) {
        let triggerNote = select[i].children[nodeIndex];
        console.log('trigger', triggerNote);
        select[i].addEventListener('click', dropdown(triggerNote));
      }
    }
  }
}


export function dropdown(){
  var selectBtn = document.getElementsByClassName('filter-component__select'),
    dropdownMenu = document.getElementsByClassName('filter-component__dropdown');

  for (i = 0; i < selectBtn.length; i++) {
    selectBtn[i].onclick = function () {
      if (this.className.indexOf('active') > -1) {
        for (j = 0; j < selectBtn.length; j++) {
          removeClass(selectBtn[j], 'active')
        }
      } else {
        addClass(this, 'active');
      }
    };
  }
  for (i = 0; i < dropdownMenu.length; i++) {
    var child = dropdownMenu[i].children;
    for (j = 0; j < child.length; j++) {
      child[j].onclick = function () {
        var text = this.innerHTML;
        this.parentNode.previousElementSibling.children[0].innerHTML = text;
        toggleClass(this.parentNode, 'is-collapsed');
      };
    }
  }

  window.addEventListener('click', function (event) {
    for (i = 0; i < selectBtn.length; i++) {
      if (event.target != selectBtn[i].children[0]) {
        removeClass(selectBtn[i], 'is-collapsed');
      }
    }
  });

  const toggleClass = (el, classToToggle) => {
    var classN = el.className;
    if (classN.indexOf(classToToggle) > -1) {
      el.className = classN.replace(" " + classToToggle, '');
    } else {
      el.className = classN + " " + classToToggle;
    }
  }
  const addClass = (el, classToToggle) => {
    var classN = el.className
    if (classN.indexOf(classToToggle) < 1) {
      el.className = classN + " " + classToToggle;
    }
  }
  const removeClass = (el, classToToggle) => {
    var classN = el.className;
    if (classN.indexOf(classToToggle) > -1) {
      el.className = classN.replace(" " + classToToggle, '');
    }
  }
}
