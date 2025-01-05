let passInput = document.querySelector(".pass input"); // الحصول على المدخل
let correctPassword = "123456"; // استبدلها بالكلمة السرية التي تريدها

// الاستماع للحدث عندما يكتب المستخدم في حقل الإدخال
passInput.addEventListener("input", function () {
  // التحقق من أن المدخل يتكون من 6 أرقام
  if (passInput.value.length === 6) {
    // إذا كانت الكلمة صحيحة
    if (passInput.value === correctPassword) {
      // تغيير القيمة في localStorage
      localStorage.setItem("auth", "1");
      alert("تم الدخول بنجاح!");
      document.querySelector(".pass").style.display = "none";

      // التوجيه إلى الصفحة المطلوبة
      window.location.reload();
    } else {
      // إذا كانت الكلمة خاطئة
      alert("كلمة المرور خاطئة، سيتم توجيهك إلى الصفحة الرئيسية.");
      window.location.href = "../index.html"; // استبدل "index.html" بالصفحة الرئيسية الخاصة بك
    }
  }
});

document.addEventListener("DOMContentLoaded", async () => {
  // التحقق من حالة الدخول من localStorage
  if (localStorage.getItem("auth") === "1") {
    document.querySelector(".pass").style.display = "none";
    const supabaseUrl = "https://muxhkzdlulrsrskhqgsp.supabase.co";
    const supabaseKey =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im11eGhremRsdWxyc3Jza2hxZ3NwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzYwODM4NzcsImV4cCI6MjA1MTY1OTg3N30.WAbPm9IhEX-aS5An5fxrmMVd4JdIgxA2Qhypu_6gMQY";
    // إنشاء عميل Supabase
    const supabase = window.supabase.createClient(supabaseUrl, supabaseKey);

    try {
      // جلب البيانات من Supabase
      const { data: orders, oerror } = await supabase
        .from("orders")
        .select("*");

      const { data: products, perror } = await supabase
        .from("products")
        .select("*");

      const { data: users, uerror } = await supabase.from("users").select("*");

      // fetch length data

      const workingOrders = orders.filter((order) => order.status === false); // استبدل 'موافقة' بالحالة التي تريد تصفيتها
      const ordersNum = document.getElementById("ordersNum");
      ordersNum.innerHTML = workingOrders.length;
      const productsNum = document.getElementById("productsNum");
      productsNum.innerHTML = products.length;
      const usersNum = document.getElementById("usersNum");
      usersNum.innerHTML = users.length;

      // fetch orders

      // Inside your if statement
      if (orders.length !== 0) {
        const ordersDev = document.getElementById("ordersDev");

        orders.forEach((order) => {
          const orderDiv = document.createElement("div");
          orderDiv.className = "order";

          const userDiv = document.createElement("div");
          userDiv.className = "user";

          // Create the status h4 element without onclick attribute
          const statusElement = document.createElement("h4");
          statusElement.className = "status " + order.status;
          statusElement.textContent = order.status
            ? "تم التوصيل"
            : "لم يتم التوصيل";
          statusElement.addEventListener("click", () => {
            updateOrderStatus(order.id, order.status);
          });

          // Build the rest of your userDiv content
          userDiv.innerHTML = `
      <div class="row">
        <h3>الحساب <span>${order.total} جنيه</span></h3>
        <h3>${order.customer}</h3>
      </div>
      <h3>${order.phone}</h3>
      <h3>${order.address}</h3>
    `;
          // Append the statusElement to the correct place in userDiv
          userDiv
            .querySelector(".row")
            .insertBefore(statusElement, userDiv.querySelector("h3"));

          orderDiv.appendChild(userDiv);

          // Create and append productsDiv as before
          const productsDiv = document.createElement("div");
          productsDiv.className = "products";

          order.products.forEach((product) => {
            const productDiv = document.createElement("div");
            productDiv.className = "product";
            productDiv.innerHTML = `
        <img src="${product.image}" alt="${product.name}">
        <h3>${product.name}</h3>
        <h3>${product.quantity} العدد</h3>
        <h3>${product.price * product.quantity} السعر</h3>
      `;
            productsDiv.appendChild(productDiv);
          });

          orderDiv.appendChild(productsDiv);
          ordersDev.appendChild(orderDiv);
        });
      }

      async function updateOrderStatus(id, status) {
        try {
          // Toggle the status by inverting its current value
          const newStatus = !status;
          const { data, error } = await supabase
            .from("orders")
            .update({ status: newStatus })
            .eq("id", id)
            .select();
          if (error) throw error;
          window.location.reload();
          // Optionally update the UI to reflect the new status
        } catch (err) {
          console.error("Error updating order status:", err);
        }
      }
    } catch (error) {
      console.error("Error in fetch:", error);
    }
  }
});
