let cardElement = document.getElementById("cards");
let loader = document.getElementById("main-div");

async function getData() {
  loader.style.display = "block";
  cardElement.style.display = "none";

  let response = await fetch("https://dummyjson.com/products");
  let data = await response.json();
  console.log(data);
  let { products } = data;

  loader.style.display = "none";
  cardElement.style.display = "flex";

  products.sort(() => Math.random() - 0.5);

  products.map((product) => {
    let {
      id,
      title,
      description,
      category,
      images,
      price,
      availabilityStatus,
      stock,
    } = product;
    let { width, height, depth } = product.dimensions;
    
    cardElement.innerHTML += ` <div class="card" onclick="goToDetail(${id})">
  <div class="badge">Stock ${stock}</div>
  <div class="tilt">
    <div class="img"><img src="${images[0]}" alt="Premium Laptop"></div>
  </div>
  <div class="info">
    <div class="cat">${category}</div>
    <h2 class="title">${title}</h2>
    <p class="desc">${description}}</p>
    <div class="feats">
      <span class="feat">Width ${width}</span>
      <span class="feat">Height ${height}</span>
      <span class="feat">Depth ${depth}</span>
    </div>
    <div class="bottom">
      <div class="price">
        <span class="new">$${price}</span>
          <div class="stock">${availabilityStatus}</div>
      </div>
      <button class="btn-1">
        <span>Add to Cart</span>
        <svg class="icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4" />
          <line x1="3" y1="6" x2="21" y2="6" />
          <path d="M16 10a4 4 0 01-8 0" />
        </svg>
      </button>
    </div>
    </div>
  </div>
</div>
`;
  });
}

getData();


function goToDetail (id) {

  window.location.href = "./product-detail/product-detail.html?id=" + id;


}


function openLoginModal() {
  document.getElementById("loginModal").style.display = "block";
  let loginbtn = document.getElementById("login-btn");
  loginbtn.onclick = function () {
    loginUser();
    let email = document.getElementById("loginEmail");
    let password = document.getElementById("loginPassword");
    email.value = "";
    password.value = "";
  };
}

function closeLoginModal() {
  document.getElementById("loginModal").style.display = "none";
}

function openRegisterModal() {
  closeLoginModal();
  document.getElementById("registerModal").style.display = "block";
  document.getElementById("loginModal").style.display = "none";

  let fullName = document.getElementById("fullName");
  let email = document.getElementById("email");
  let password = document.getElementById("NewPasswordInput");
  let hideEye = document.getElementById("toggle-eye");
  let rigisterHeading = document.getElementById("register-h2");
  let registerBtn = document.getElementById("register-btn");
  let para = document.getElementById("para");

  fullName.style.margin = "0px";
  email.style.margin = "0px";
  password.style.margin = "0px";
  fullName.style.display = "block";
  email.style.display = "block";
  password.style.display = "block";
  hideEye.style.display = "block";
  rigisterHeading.innerHTML = "Create an account";
  registerBtn.innerHTML = "Register";
  registerBtn.style.marginTop = "10px";
  registerBtn.onclick = resgisterUser;
  para.innerHTML = "";
}

function closeRegisterModal() {
  document.getElementById("registerModal").style.display = "none";
}

let passInput = document.getElementById("loginPassword");
let passEye = document.getElementById("eye-img");
let NewPasswordEyeImg = document.getElementById("new-eye-img");
let NewPasswordInp = document.getElementById("NewPasswordInput");

function passwrodTypeChnge() {
  if (passInput.type === "password" || NewPasswordInp.type === "password") {
    passInput.type = "text";
    NewPasswordInp.type = "text";
    passEye.src = "https://cdn-icons-png.flaticon.com/512/159/159604.png";
    NewPasswordEyeImg.src =
      "https://cdn-icons-png.flaticon.com/512/159/159604.png";
  } else {
    passInput.type = "password";
    passEye.src = "https://cdn-icons-png.flaticon.com/512/709/709612.png";
    NewPasswordInp.type = "password";
    NewPasswordEyeImg.src =
      "https://cdn-icons-png.flaticon.com/512/709/709612.png";
  }
}

class Person {
  fullName;
  email;
  password;
  constructor(fullName, email, password) {
    (this.fullName = fullName),
      (this.email = email),
      (this.password = password);
  }
}
function resgisterUser(event) {
  event.preventDefault();
  let form = document.getElementById("registerForm");

  if (!form.checkValidity()) {
    form.reportValidity();
    return;
  }

  let fullName = document.getElementById("fullName");
  let email = document.getElementById("email");
  let password = document.getElementById("NewPasswordInput");
  let usersFromStorage = JSON.parse(localStorage.getItem("users")) || [];
  let para = document.getElementById("para");
  let savedUser = usersFromStorage.find(
    (element) => element.email === email.value
  );

  if (savedUser?.email) {
    para.innerHTML = "This user is already registered";
    fullName.value = "";
    email.value = "";
    password.value = "";
  } else {
    let newUser = new Person(fullName.value, email.value, password.value);
    usersFromStorage.push(newUser);
    fullName.value = "";
    email.value = "";
    password.value = "";
    para.innerHTML = "";
    localStorage.setItem("users", JSON.stringify(usersFromStorage));
    fullName.style.display = "none";
    email.style.display = "none";
    password.style.display = "none";
    let hideEye = document.getElementById("toggle-eye");
    hideEye.style.display = "none";
    let rigisterHeading = document.getElementById("register-h2");
    rigisterHeading.innerHTML = "Welcome to OLX";
    let registerBtn = document.getElementById("register-btn");
    registerBtn.innerHTML = "Login your Account";
    registerBtn.onclick = function () {
      openLoginModal();
      closeRegisterModal();
      let creatAccount = document.getElementById("creat-account");
      creatAccount.onclick = function () {
        openRegisterModal();
        closeLoginModal;
      };
      let invailedPara = document.getElementById("invailed-para");
      invailedPara.style.display = "none";
    };
  }
}

// Toggle dropdown when avatar is clicked
document.querySelector("#useravator").addEventListener("click", function (e) {
  e.preventDefault();

  let dropdownMenu = document.querySelector(".dropdown-menu");
  dropdownMenu.classList.toggle("active");
});

// Close dropdown when clicking outside
// //  <!-- //////////////////////////////Dtrat point//////////////////////////// -->

// function toogle() {
// parent dropdown toggle

// document.querySelectorAll('.dropdown-toggle').forEach((toggle) => {
//   toggle.addEventListener('click', function (e) {
//     e.preventDefault();

//     let parent = this.closest('.dropdown');

//     // close all other dropdowns
//     document.querySelectorAll('.dropdown').forEach((drop) => {
//       if (drop !== parent) {
//         drop.classList.remove('active');
//         drop.querySelectorAll('.dropdown-menu').forEach((menu) => {
//           menu.classList.remove('active');
//         });
//       }
//     });

//     // toggle current
//     let menu = parent.querySelector('.dropdown-menu');
//     if (menu) {
//       menu.classList.toggle('active');
//       parent.classList.toggle('active');
//     }
//   });
// });

// // submenu toggle
// document.querySelectorAll('.dropdown-submenu > .dropdown-toggle').forEach((toggle) => {
//   toggle.addEventListener('click', function (e) {
//     e.preventDefault();

//     let parent = this.closest('.dropdown-submenu');
//     let menu = parent.querySelector('.dropdown-menu');
//     if (menu) {
//       menu.classList.toggle('active');
//       parent.classList.toggle('active');
//     }
//   });
// });

// // }

function loginUser() {
  event.preventDefault();
  let email = document.getElementById("loginEmail");
  let password = document.getElementById("loginPassword");
  let usersFromStorage = JSON.parse(localStorage.getItem("users")) || [];
  let savedUser = usersFromStorage.find(
    (element) => element.email === email.value
  );
  if (
    savedUser?.email === email.value &&
    savedUser?.password === password.value
  ) {
    email.value = "";
    password.value = "";
    email.style.display = "none";
    password.style.display = "none";
    let loginText = document.getElementById("login-text");
    let eyeIcon = document.getElementById("eye-img");
    let backBtn = document.getElementById("login-btn");
    let lastPara = document.getElementById("last-para-login");

    backBtn.innerHTML = "Back to Home";
    backBtn.onclick = function () {
      document.getElementById("loginModal").style.display = "none";
    };
    loginText.innerHTML = "Login Succesfull";
    localStorage.setItem("loggedinUser", JSON.stringify(savedUser));
    loginText.style.textAlign = "center";
    eyeIcon.style.display = "none";
    lastPara.style.display = "none";
    let loginbtn = document.getElementById("login-word");
    loginbtn.style.display = "none";
    let dropDown = document.getElementById("profile-dropdown");
    dropDown.style.display = "block";
    let userName = document.getElementById("userName");
    let userEmail = document.getElementById("userEmail");
    let invailedPara = document.getElementById("invailed-para");
    invailedPara.style.display = "none";
    userName.innerHTML = savedUser.fullName;
    userEmail.innerHTML = savedUser.email;
  } else {
    let invailedPara = document.getElementById("invailed-para");
    invailedPara.style.display = "block";
    invailedPara.innerHTML = "Invalid credientials.";
  }
}

function logoutUser() {
  localStorage.removeItem("loggedinUser");
  console.log("logout Clicked");
  let dropDown = document.getElementById("profile-dropdown");
  dropDown.style.display = "none";
  let loginbtn = document.getElementById("login-word");
  loginbtn.style.display = "block";
  loginbtn.style.height = "50px";
  loginbtn.style.width = "70px";
  loginbtn.style.display = "flex";
  loginbtn.style.justifyContent = "center";
  loginbtn.style.alignItems = "center";

  let loginText = document.getElementById("login-text");
  loginText.style.marginBottom = "20px";
  loginText.innerHTML = "Login";
  loginText.style.textAlign = "left";

  let eyeIcon = document.getElementById("eye-img");
  eyeIcon.style.display = "block";

  let lastPara = document.getElementById("last-para-login");
  lastPara.style.display = "block";

  let email = document.getElementById("loginEmail");
  let password = document.getElementById("loginPassword");
  email.style.margin = "0px";
  password.style.margin = "0px";
  email.style.display = "block";
  password.style.display = "block";
  email.value = "";
  password.value = "";

  let backBtn = document.getElementById("login-btn");
  backBtn.innerHTML = "Login";
  backBtn.onclick = loginUser;

  let invailedPara = document.getElementById("invailed-para");
  invailedPara.style.display = "none";

  loginbtn.onclick = function () {
    document.getElementById("loginModal").style.display = "block";
  };
}
