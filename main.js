// Preloader
const preloader = document.getElementById("preloader");

window.addEventListener("load", function () {
  preloader.style.transform = "translateY(-100%)";
});

// Header
const menuLinks = document.querySelector("header .links");
const menuLogo = document.querySelector("header .logo");
const menuToggle = document.getElementById("lines");

function toggleMenu() {
  if (menuToggle.checked) {
    menuLinks.style.transform = "translateX(0)";
    menuLogo.style.opacity = 0;
  } else {
    menuLinks.style.transform = "translateX(350px)";
    menuLogo.style.opacity = 1;
  }
}

// Scroll effect
window.onscroll = function () {
  const scrollValue = window.scrollY;
  const logoFrames = document.querySelectorAll(".logoframe");
  const scrollkerep = document.querySelectorAll(".kerep");
  const scrollprandname = document.querySelectorAll(".prandname");

  scrollkerep.forEach(function (kerep) {
    kerep.style.transform = `translateY(${-scrollValue * 0.7}px)`;
  });
  scrollprandname.forEach(function (prandname) {
    prandname.style.transform = `translateY(${scrollValue * 0.7}px)`;
  });

  logoFrames.forEach(function (frame) {
    frame.style.transform = `rotate(${scrollValue / 2.5}deg)`;
  });
};

// Prepare images
const topImagesContainer = document.querySelector(".top .imgs");
const firstTopElements = document.querySelectorAll(".secone .top");

const images = [
  "assets/imgs/juicy-cheeseburger.png",
  "assets/imgs/burger.png",
  "assets/imgs/pizza-salami.png",
];

let imgsHTML = "";
for (let j = 0; j < 5; j++) {
  images.forEach(function (image) {
    imgsHTML += `<img class='scrlimg' src='${image}'>`;
  });
}
topImagesContainer.innerHTML = imgsHTML;

if (window.innerWidth < 600) {
  const scrollImages = document.querySelectorAll(".scrlimg");
  firstTopElements.forEach(function (top) {
    top.style.flexDirection = "column-reverse";
  });

  topImagesContainer.querySelectorAll("img").forEach(function (img) {
    img.style.display = "flex";
    img.style.width = "90%";
    img.style.height = "300px";
    img.style.overflowX = "hidden";
  });

  scrollImages.forEach(function (image) {
    image.style.width = "300px";
    image.style.padding = "0 10px";
  });
}

// Fetch products
