// prelodar
var lodar = document.getElementById("preloader");

window.addEventListener("load", function () {
  lodar.style.transform = "translateY(-100%)";
});

window.onscroll = function () {
  let value = window.scrollY;
  let width = window.screen.availWidth;

  let logoframe = document.querySelector(".logoframe");

  logoframe.style.transform = "rotate(" + value / 2.5 + "deg)";
};
