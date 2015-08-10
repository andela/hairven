var myVar = setInterval(function(){
  myTimer()
}, 1000);

function myTimer () {
  var d = new Date();
  document.getElementById("showtime").innerHTML = d.toLocaleTimeString();
};

$(function() {
  // fancybox
  jQuery(".fancybox").fancybox();
});