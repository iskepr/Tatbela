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
    if (document.getElementById("checkout-button") !== null) {
      document.getElementById("checkout-button").style.display = "none";
      cartItemsContainer.innerHTML = "<h1>فارغة</h1>";
      cartTotalContainer.textContent = "";
    }
    return;
  }

  let cartHTML = "";
  let total = 0;

  cart.forEach((product, index) => {
    total += parseFloat(product.price) * product.quantity; // حساب المجموع

    cartHTML += `
                <div class="cart-item" data-index="${index}">
                    <div class="detals">
                      <a href="product.html?id=${product.id}">
                        <h3>${product.name}</h3>
                        <p>السعر: ${product.price} جنيه</p>
                      </a>
                        <div class="quantity-controls">
                            <button class="decrease-quantity mainbut">-</button>
                            <span>الكمية: ${product.quantity}</span>
                            <button class="increase-quantity mainbut">+</button>
                        </div>
                        <button class="remove-item mainbut">حذف المنتج</button>
                    </div>
                    <a href="product.html?id=${product.id}">
                    <img src="${product.image}" alt="${product.name}">
                    </a>
                </div>
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
async function sendOrder(name, phone, address) {
  // إعداد الاتصال بـ Supabase
  const supabaseUrl = "https://muxhkzdlulrsrskhqgsp.supabase.co";
  const supabaseKey =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im11eGhremRsdWxyc3Jza2hxZ3NwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzYwODM4NzcsImV4cCI6MjA1MTY1OTg3N30.WAbPm9IhEX-aS5An5fxrmMVd4JdIgxA2Qhypu_6gMQY";
  const supabase = window.supabase.createClient(supabaseUrl, supabaseKey);

  // استرجاع محتويات السلة من LocalStorage
  let cart = JSON.parse(localStorage.getItem("cart"));
  if (!cart || cart.length === 0) {
    alert("السلة فارغة!");
    return;
  }

  // تجهيز تفاصيل الطلب
  let orderDetails = cart.map((product) => ({
    product_id: product.id,
    image: product.image,
    name: product.name,
    price: product.price,
    quantity: product.quantity,
  }));

  // إنشاء كائن الطلب
  const order = {
    customer: name,
    phone: phone,
    address: address,
    products: orderDetails,
    total: cart.reduce(
      (total, product) => total + product.price * product.quantity,
      0
    ),
  };

  try {
    // إرسال الطلب إلى Supabase
    const { data, error } = await supabase
      .from("orders") // اسم الجدول في Supabase
      .insert([order]); // إدخال الطلب

    if (error) {
      console.error("Error inserting order:", error);
      alert("حدث خطأ أثناء إرسال الطلب.");
      return;
    }

    // عرض رسالة نجاح
    document.querySelector(".alert").innerHTML = "تم إرسال الطلب بنجاح!";
    document.querySelector(".alert").style.transform = "translate(0px)";
    setTimeout(() => {
      document.querySelector(".alert").style.transform = "translate(400px)";
    }, 3000);

    // تنظيف السلة
    localStorage.removeItem("cart");
    displayCart(); // تحديث العرض بعد الشراء
    window.location.href = "index.html";
  } catch (error) {
    console.error("Unexpected error:", error);
    alert("حدث خطأ غير متوقع.");
  }
}

// عرض السلة عند تحميل الصفحة
displayCart();
