
export default function menuToggle() {
  let toggleMenu = document.getElementById('toggleMenu');
  let mainnav = document.getElementById('main-nav');
  toggleMenu.addEventListener('click', (event) => {
    event.stopPropagation();
    toggleMenu.children[0].classList.toggle("nav-toggleIcon--active");
    mainnav.classList.toggle("is-visible")
  })
}