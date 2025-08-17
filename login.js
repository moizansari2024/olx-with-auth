import { auth, db } from "./confige.js";

import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from "./auth.js";

import { setDoc, collection, doc, getDocs } from "./database.js";

//toggle container
let showRegister = document.querySelector("#showRegister");
let showLogin = document.querySelector("#showLogin");

//register
let registerForm = document.querySelector("#registerForm");

//login
let loginForm = document.querySelector("#loginForm");

//btn
let registerBtn = document.querySelector("#register-user-btn");
let loginBtn = document.querySelector("#login-user-btn");

//logout btn
let logOutBtn = document.querySelector("#logout-btn");

function toggleForms(target) {
  if (target === "register") {
    registerForm.style.display = "block";
    loginForm.style.display = "none";
  } else {
    loginForm.style.display = "block";
    registerForm.style.display = "none";
  }
}

// debugger

async function registerUser(e) {
  e.preventDefault();
  let userFirstName = document.querySelector("#userFirstName");
  let userLastName = document.querySelector("#userLastName");
  let userEmail = document.querySelector("#email");
  let userPassword = document.querySelector("#password");
  let userPhoneNum = document.querySelector("#phoneNum");

  createUserWithEmailAndPassword(auth, userEmail, userPassword)
    .then((userCredential) => {
      // Signed up
      const user = userCredential.user;
      addUserToDb(
        userFirstName,
        userLastName,
        userEmail,
        userPhoneNum,
        user.uid
      );
      alert("user resgister successfully");
      console.log("user register ho gaya hai", user);

      userFirstName.value = "";
      userLastName.value = "";
      userEmail.value = "";
      userPassword.value = "";
      userPhoneNum.value = "";

      // ...
    })

    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      alert("failed to register user");
      console.log(errorMessage);

      // ..
    });
}

let isFirstLogin = false;

function loginUser(e) {
  e.preventDefault();
  let loginEmail = document.querySelector("#login-email");
  let loginPassword = document.querySelector("#login-password");

  signInWithEmailAndPassword(auth, loginEmail.value.trim(), loginPassword.value.trim())
    .then((userCredential) => {
      // Signed in
      const user = userCredential.user;
  alert("user login successfully");
      console.log("user login ho gaya hai ", user);
      isFirstLogin = true;

      loginEmail.value = "";
      loginPassword.value = "";

      // ...
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      alert("failed to login user");
      console.log(errorMessage);
    });
}

function currentUser() {
  onAuthStateChanged(auth, (user) => {
    if (user) {
      // User is signed in, see docs for a list of available properties
      // https://firebase.google.com/docs/reference/js/auth.user
      const uid = user.uid;

      console.log("user login hai", uid);

      if (isFirstLogin) {
        getAllUsers();
        isFirstLogin = false;
      }

      // ...
    } else {
      // User is signed out
      // ...

      console.log("user logout hai");
    }
  });
}

currentUser();

function signOutUser() {
  signOut(auth)
    .then(() => {
      // Sign-out successful.
      alert("sign out successfully");
      console.log("sign out successfully");
    })
    .catch((error) => {
      // An error happened.
      alert("failed to logout user");
      console.log("failed to logout user", error);
    });
}

async function addUserToDb(
  userFirstName,
  userLastName,
  userEmail,
  userPhoneNum,
  userId
) {
  const docRef = await setDoc(doc(db, "users", userId), {
    userFirstName,
    userLastName,
    userEmail,
    userPhoneNum,
    userId,
    // image: 'https://images.pexels.com/photos/2486168/pexels-photo-2486168.jpeg'
  });
  console.log("User document created:", userId);
}

async function getAllUsers() {
  const querySnapshot = await getDocs(collection(db, "users"));
  querySnapshot.forEach((doc) => {
    // doc.data() is never undefined for query doc snapshots
    console.log(doc.id, " => ", doc.data());
  });
}

showRegister.addEventListener("click", () => toggleForms("register"));
showLogin.addEventListener("click", () => toggleForms("login"));
registerBtn.addEventListener("click", registerUser);
loginBtn.addEventListener("click", loginUser);
logOutBtn.addEventListener("click", signOutUser);
