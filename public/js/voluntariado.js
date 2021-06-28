// $(document).ready(function () {
//   $("#conta").mousemove(function () {
//     var date = new Date("Mar 28, 2020 18:00:00");
//     var countDownDate = date.getTime();

//     // Update the count down every 1 second
//     var x = setInterval(function () {
//       // Get todays date and time
//       var now = new Date().getTime();

//       // Find the distance between now an the count down date
//       var distance = countDownDate - now;

//       // Time calculations for days, hours, minutes and seconds
//       var days = Math.floor(distance / (1000 * 60 * 60 * 24));
//       var hours = Math.floor(
//         (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
//       );
//       var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
//       var seconds = Math.floor((distance % (1000 * 60)) / 1000);

//       // If the count down is over, write some text

//       days = days <= 9 ? "0" + days : days;
//       days = days == 1 ? days : days;
//       hours = hours <= 9 ? "0" + hours : hours;
//       minutes = minutes <= 9 ? "0" + minutes : minutes;
//       seconds = seconds <= 9 ? "0" + seconds : seconds;

//       // Output the result in an element with id="demo"
//       document.getElementById("h5").innerHTML = days;
//       document.getElementById("h6").innerHTML = hours;
//       document.getElementById("h7").innerHTML = minutes;
//       document.getElementById("h8").innerHTML = seconds;
//     }, 1000);
//   });
// });
jQuery(function ($) {
  $(document).on('keypress', 'input.somente-numero', function (e) {
    var square = document.getElementById("numero");
    var key = (window.event) ? event.keyCode : e.which;
    if ((key > 47 && key < 58)) {
      //numero.style.backgroundColor = "#ffffff";
      return true;

    } else {
      //numero.style.backgroundColor = "#ff0000";
      return (key == 8 || key == 0) ? true : false;

    }
  });
});