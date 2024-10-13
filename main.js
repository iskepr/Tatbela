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
  const scrollmainbut = document.querySelectorAll(".secone .mainbut");

  scrollkerep.forEach(function (kerep) {
    kerep.style.transform = `translateY(${-scrollValue * 0.7}px)`;
  });
  scrollprandname.forEach(function (prandname) {
    prandname.style.transform = `translateY(${scrollValue}px)`;
  });
  scrollmainbut.forEach(function (mainbut) {
    mainbut.style.transform = `translateY(${-scrollValue * 0.9}px)`;
  });

  logoFrames.forEach(function (frame) {
    frame.style.transform = `rotate(${scrollValue / 2.5}deg)`;
  });
};

// cart products
// استرجاع السلة من localStorage
function displayCart() {
  let cart = localStorage.getItem("cart");
  cart = cart ? JSON.parse(cart) : [];

  let cartItemsContainer = document.getElementById("cart-items");
  let cartTotalContainer = document.getElementById("cart-total");

  let cartball = document.getElementById("cartball");
  cartball.innerHTML = cart.length;

  if (cart.length === 0) {
    cartball.style.display = "none";
    document.getElementById("checkout-button").style.display = "none";
    cartItemsContainer.innerHTML = "<h1>فارغة</h1>";
    cartTotalContainer.textContent = "";
    return;
  }

  let cartHTML = "";
  let total = 0;

  cart.forEach((product, index) => {
    total += parseFloat(product.price) * product.quantity; // حساب المجموع

    cartHTML += `
                <a href="product.html?id=${product.id}">
                <div class="cart-item" data-index="${index}">
                    <div class="detals">
                        <h3>${product.name}</h3>
                        <p>السعر: ${product.price} جنيه</p>
                        <div class="quantity-controls">
                            <button class="decrease-quantity mainbut">-</button>
                            <span>الكمية: ${product.quantity}</span>
                            <button class="increase-quantity mainbut">+</button>
                        </div>
                        <button class="remove-item mainbut">حذف المنتج</button>
                    </div>
                    <img src="${product.image}" alt="${product.name}">
                </div></a>
            `;
  });
  if (cartItemsContainer) {
    cartItemsContainer.innerHTML = cartHTML;
    cartTotalContainer.textContent = `المجموع: ${total.toFixed(2)} جنية`;
  }
  // إضافة الأحداث لعناصر التحكم في الكمية
  document.querySelectorAll(".increase-quantity").forEach((button) => {
    button.addEventListener("click", function () {
      let index = this.closest(".cart-item").getAttribute("data-index");
      increaseQuantity(index);
    });
  });

  document.querySelectorAll(".decrease-quantity").forEach((button) => {
    button.addEventListener("click", function () {
      let index = this.closest(".cart-item").getAttribute("data-index");
      decreaseQuantity(index);
    });
  });

  // إضافة الحدث لحذف المنتجات
  document.querySelectorAll(".remove-item").forEach((button) => {
    button.addEventListener("click", function () {
      let index = this.closest(".cart-item").getAttribute("data-index");
      removeItem(index);
    });
  });
}

// زيادة الكمية
function increaseQuantity(index) {
  let cart = JSON.parse(localStorage.getItem("cart"));
  cart[index].quantity += 1;
  localStorage.setItem("cart", JSON.stringify(cart));
  displayCart(); // تحديث العرض
}

// تقليل الكمية
function decreaseQuantity(index) {
  let cart = JSON.parse(localStorage.getItem("cart"));
  if (cart[index].quantity > 1) {
    cart[index].quantity -= 1;
    localStorage.setItem("cart", JSON.stringify(cart));
    displayCart(); // تحديث العرض
  }
}

// حذف المنتج
function removeItem(index) {
  let cart = JSON.parse(localStorage.getItem("cart"));
  cart.splice(index, 1); // حذف المنتج بناءً على الفهرس
  localStorage.setItem("cart", JSON.stringify(cart));
  displayCart(); // تحديث العرض
}

if (document.getElementById("checkout-button")) {
  document
    .getElementById("checkout-button")
    .addEventListener("click", function () {
      // التحقق من وجود بيانات العميل في localStorage
      let name = localStorage.getItem("customerName");
      let phone = localStorage.getItem("customerPhone");
      let address = localStorage.getItem("customerAddress");

      if (name && phone && address) {
        // إذا كانت البيانات موجودة، إرسال الطلب مباشرة
        sendOrder(name, phone, address);
      } else {
        // إذا لم تكن البيانات موجودة، عرض النموذج
        document.getElementById("customer-info-form").style.display = "flex";
      }
    });
}
// إرسال بيانات العميل
if (document.getElementById("submit-customer-info")) {
  document
    .getElementById("submit-customer-info")
    .addEventListener("click", function () {
      let name = document.getElementById("customer-name").value;
      let phone = document.getElementById("customer-phone").value;
      let address = document.getElementById("customer-address").value;

      if (name && phone && address) {
        // حفظ بيانات العميل في localStorage
        localStorage.setItem("customerName", name);
        localStorage.setItem("customerPhone", phone);
        localStorage.setItem("customerAddress", address);

        // إرسال الطلب بعد حفظ البيانات
        sendOrder(name, phone, address);
      } else {
        alert("يرجى إدخال جميع المعلومات المطلوبة.");
      }
    });
}
// دالة لإرسال الطلب
function sendOrder(name, phone, address) {
  let cart = JSON.parse(localStorage.getItem("cart"));
  let orderDetails = cart
    .map(
      (product) => `
    <div style="
      background-color: #111111;
      color:  #ffffff;
      margin: 10px 0; 
      border-bottom: 1px solid #gray;">
      <img style="border-radius: 16px;" width="100" src="https://iskepr.github.io/Tatbela/assets/imgs/${product.id}.png">
      <a style="color: #fff; font-weight: bold;" href="https://iskepr.github.io/Tatbela/product.html?id=${product.id}">${product.name}</a>
      (سعر: ${product.price} جنيه ، كمية: ${product.quantity}) 
      <br>
    </div>`
    )
    .join("\n");

  let orderEmail = `
    <div style="background-color: #111111; color:  #ffffff; padding: 10px;border-radius: 20px;">
      طلب جديد من: ${name}<br>
      رقم الهاتف: ${phone}<br>
      العنوان: ${address}<br>
      <hr>
      تفاصيل المنتجات:<br>
      ${orderDetails}<br>
      <a style="color: #fff; font-weight: bold;" class="power" href="https://iskepr.web.app">تم برمجة الموقع بواسطة <span style="color: #ecc243;">@سكيبر</span>
      </a>
    </div>
  `;

  Email.send({
    SecureToken: "d08980c7-8f23-4bc5-9d8f-37f618605096",
    To: "skeprfuc@gmail.com",
    From: "skeprfuc@gmail.com",
    Subject: "طلب جديد من تتبيلة",
    Body: orderEmail,
  }).then((message) => {
    document.querySelector(".alert").innerHTML = "تم إرسال الطلب بنجاح!";
    document.querySelector(".alert").style.transform = "translate(0px)";
    setTimeout(function () {
      document.querySelector(".alert").style.transform = "translate(400px)";
    }, 3000);
    localStorage.removeItem("cart"); // مسح السلة بعد الإرسال
    displayCart(); // تحديث العرض بعد الشراء
    window.location.href = "index.html";
  });
}

// عرض السلة عند تحميل الصفحة
displayCart();
