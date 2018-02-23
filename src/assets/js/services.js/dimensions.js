

export default  function dimentions(){
  function resizeFunction() {
    // this take into account the space the scrollbar is using.
    document.body.style.overflow = "hidden";
    let clientWidth = document.documentElement.clientWidth;
    let clientHeight = document.documentElement.clientHeight;
    let windowWrapper = document.getElementById('window');
    let contentWrapper = document.getElementById('content');
    // Stuff that should happen on resize
    windowWrapper === null ? '' : windowWrapper.style.height = `${clientHeight}px`;
    windowWrapper === null ? '' : windowWrapper.style.width = `${clientWidth}px`;
    windowWrapper === null ? '': windowWrapper.style.overflowY = 'auto';
    console.log('clientHeight ', clientHeight, 'clientWidth ', clientWidth);
  };
  // On resize, run the function and reset the timeout
  // 250 is the delay in milliseconds. Change as you see fit.
  if (document.getElementById('window') !== null){
    resizeFunction();
    window.onresize = function () {
      let resizeTimer;
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(function () {
        document.body.style.overflow = "";
        resizeFunction();
      }, 250);
    };
  }
  let scrollHeight = Math.max(
    document.body.scrollHeight, document.documentElement.scrollHeight,
    document.body.offsetHeight, document.documentElement.offsetHeight,
    document.body.clientHeight, document.documentElement.clientHeight
  );
  console.log('Current scroll from the top: ' + window.pageYOffset);
  console.log('Current scroll from the left: ' + window.pageXOffset);
  //The button below scrolls the page to make itself show at the window top:
  //windowWrapper.scrollIntoView()

  //And this button scrolls the page to show it at the bottom:
  //windowWrapper.scrollIntoView(false)

  //The method scrollBy(x, y) scrolls the page relative to its current position.For instance, scrollBy(0, 10) scrolls the page 10px down.
  //The button below demonstrates this:

  window.scrollBy(0, 10)
  //  The method scrollTo(pageX, pageY) scrolls the page relative to the document top - left corner.It’s like setting scrollLeft / scrollTop.
  //To scroll to the very beginning, we can use scrollTo(0, 0).
  window.scrollTo(0, 0)

  // left: 37, up: 38, right: 39, down: 40,
  // spacebar: 32, pageup: 33, pagedown: 34, end: 35, home: 36
  var keys = { 37: 1, 38: 1, 39: 1, 40: 1 };

  function preventDefault(e) {
    e = e || window.event;
    if (e.preventDefault)
      e.preventDefault();
    e.returnValue = false;
  }

  function preventDefaultForScrollKeys(e) {
    if (keys[e.keyCode]) {
      preventDefault(e);
      return false;
    }
  }

  function disableScroll() {
    if (window.addEventListener) // older FF
      window.addEventListener('DOMMouseScroll', preventDefault, false);
    window.onwheel = preventDefault; // modern standard
    window.onmousewheel = document.onmousewheel = preventDefault; // older browsers, IE
    window.ontouchmove = preventDefault; // mobile
    document.onkeydown = preventDefaultForScrollKeys;
  }

  function enableScroll() {
    if (window.removeEventListener)
      window.removeEventListener('DOMMouseScroll', preventDefault, false);
    window.onmousewheel = document.onmousewheel = null;
    window.onwheel = null;
    window.ontouchmove = null;
    document.onkeydown = null;
  }
  if (document.getElementById("enable") !== null ){
    document.getElementById("enable").onclick = function () {
      enableScroll();
      document.getElementById("content").scrollIntoView({ block: "start" });
      document.getElementById("status").innerHTML = "enabled";
      document.getElementById("status").className = "enabled";
      document.getElementById("overlay").style.display = "none";
    };

    document.getElementById("disable").onclick = function () {
      disableScroll();
      document.getElementById("overlay").style.display = "block";
      document.getElementById("status").innerHTML = "disabled";
      document.getElementById("status").className = "disabled";
    };
  }
}