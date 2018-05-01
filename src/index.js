import "babel-polyfill";
//import 'whatwg-fetch';
import "bootstrap";
import "jquery";
import $ from "jquery";
import "./assets/scss/app.scss";
import "./assets/js/app.js";
$("#myModal").on("shown.bs.modal", function() {
  $("#myInput").trigger("focus");
});
$(function() {
  $('[data-toggle="tooltip"]').tooltip();
});
//$('body').scrollspy({ target: '#list-example'})
 if ($(window.location.hash).length > 0) {
  var $target = $(window.location.hash);
  $("html, body").animate(
    {
      scrollTop: $target.offset().top + 210
    },
    500
  );
}
$(".list-group-item").on('click', function(e) {
  e.preventDefault();
  $('html, body').animate({ 
      scrollTop: $(this.hash).offset().top - 230
  }, 200);
});
/* $('.list-group-item').on("click", function(event) {
  var $target = $(window.location.hash);
  console.log($target.offset().top)
  $(window).scrollTop($target.offset().top - $("html, body").offset().top + $("html, body").scrollTop());
}); */
/* $(".list-group-item").on("click", function(event) {
  console.log(event.target);
  var $target = $(window.location.hash);
  /* $('#timeline').animate({
    scrollTop: $target.offset().top + 230
  }, 500); 
  setTimeout(function() {
    $(window).scrollTo(event.target);
  }, 100);
  console.log("scroll too", $target.offset().top);
}); */
 

/*
  var $container = $("html, body"),
      $scrollTo = $(event.target);
      console.log(event.target);
    $container.scrollTop(
        $scrollTo.offset().top - $container.offset().top + $container.scrollTop() - 230
    );
    console.log($scrollTo.offset().top - ($container.offset().top + $container.scrollTop() - 230));
*/ 