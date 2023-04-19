// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.19.0/firebase-app.js";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import {
  getAuth,
  onAuthStateChanged,
} from "https://www.gstatic.com/firebasejs/9.19.0/firebase-auth.js";
// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC7dh-u2rDuvO17nrZGhYOkMKH_BvueD4c",
  authDomain: "shoppy-6f25b.firebaseapp.com",
  databaseURL: "https://shoppy-6f25b-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "shoppy-6f25b",
  storageBucket: "shoppy-6f25b.appspot.com",
  messagingSenderId: "716794498757",
  appId: "1:716794498757:web:0056deb757a791f5ab6aac",
  measurementId: "G-XQGGQZ33GR",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

const auth = getAuth(app);

// Detect auth state
onAuthStateChanged(auth, (user) => {
  if (user != null) {
    console.log("logged in!");
  } else {
    console.log("No user");
  }
});
