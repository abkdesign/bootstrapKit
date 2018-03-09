import "babel-polyfill";
//import 'whatwg-fetch';
import 'bootstrap';
import 'jquery';
import $ from  'jquery';
import './assets/scss/app.scss';
$('#myModal').on('shown.bs.modal', function () {
  $('#myInput').trigger('focus')
})
