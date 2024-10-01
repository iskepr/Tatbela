
// prelodar
var lodar = document.getElementById("preloader");

window.addEventListener("load", function () {
  lodar.style.transform = "translateY(-100%)";
});

window.onscroll = function () {
  let value = window.scrollY;
  let logoframes = document.querySelectorAll(".logoframe");
  let scrollimgs = document.querySelectorAll(".scrlimg");

  if (screen.width > 600) {
    scrollimgs.forEach(function (scrollimg) {
      scrollimg.style.transform = "translateY(" + -value / 0.8 + "px)";
    });
  } else {
    scrollimgs.forEach(function (scrollimg) {
      scrollimg.style.transform = "translateX(" + -value / 0.5 + "px)";
    });
  }
  logoframes.forEach(function (logoframe) {
    logoframe.style.transform = "rotate(" + value / 2.5 + "deg)";
  });
};
let topimgs = document.querySelectorAll(".top .imgs");
let firsttop = document.querySelectorAll(".secone .top");

const images = [
  "assets/imgs/juicy-cheeseburger.png",
  "assets/imgs/burger.png",
  "assets/imgs/pizza-salami.png",
];
let imgs = "";
for (let j = 0; j < 5; j++) {
  // استخدم متغير j للحلقة الخارجية
  for (let i = 0; i < images.length; i++) {
    imgs += "<img class='scrlimg' src='" + images[i] + "'>";
  }
}
document.querySelector(".top .imgs").innerHTML = imgs;
if (screen.width < 600) {
  let scrollimgs = document.querySelectorAll(".scrlimg");
  firsttop.forEach(function (top) {
    top.style.flexDirection = "column-reverse";
  });

  topimgs.forEach(function (img) {
    img.style.display = "flex";
    img.style.width = "90%";
    img.style.height = "300px";
    img.style.overflowX = "hidden";
  });

  scrollimgs.forEach(function (image) {
    image.style.width = "300px";
    image.style.padding = "0px 10px";
  });
}

// fich products

