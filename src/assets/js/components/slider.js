export default function setSlideIndex() {
  let dotElements = document.getElementsByClassName('testimonial__dot');
  let currentSlide = this.currentSlide;
  console.log(dotElements[currentSlide], dotElements.length);
  console.log(this.currentSlide);
  for (let i = 0; i < dotElements.length; i++) {
    dotElements[i].className = dotElements[i].className.replace(" testimonial__dot--active", "");
  }
  dotElements[currentSlide].className += " testimonial__dot--active";
}