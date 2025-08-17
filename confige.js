
// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-firestore.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyDMFRsWsGoykjLE24kZ5ivNCU5Uq1--lOQ",
    authDomain: "fir-auth-eb7f5.firebaseapp.com",
    projectId: "fir-auth-eb7f5",
    storageBucket: "fir-auth-eb7f5.appspot.com",
    messagingSenderId: "838948535269",
    appId: "1:838948535269:web:0b3f2c5d8e4a6f7c9d8e1a",

    // measurementId: "G-XXXXXXX" // optional hai, sirf analytics ke liye
};



// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export {
    auth,
    db
}








