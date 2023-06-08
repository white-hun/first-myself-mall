// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import {
  GoogleAuthProvider,
  browserSessionPersistence,
  getAuth,
  onAuthStateChanged,
  setPersistence,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_DATABASEURL,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKE,
  messagingSenderId: process.env.REACT_APP_MESSAGEING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID,
  measurementId: process.env.REACT_APP_MEASUREMENT_ID,
  // The value of `databaseURL` depends on the location of the database
  // databaseURL: "https://DATABASE_NAME.firebaseio.com",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

setPersistence(auth, browserSessionPersistence)
  .then(() => {
    const provider = new GoogleAuthProvider();
    return signInWithEmailAndPassword(auth, provider);
  })
  .catch((error) => {
    const errorCode = error.errorCode;
    const errorMessage = error.message;
    console.log(errorCode, errorMessage);
  });

// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);

export function onUserStateChanged(callback) {
  const auth = getAuth();
  onAuthStateChanged(auth, (user) => {
    callback(user);
  });
}

// Detect auth state
// onAuthStateChanged(auth, (user) => {
//   if (user != null) {
//     console.log(user);
//     console.log("Logged In");
//   } else {
//     // console.log(user);
//     console.log("No user");
//   }
// });

//"https://www.gstatic.com/firebasejs/9.19.0/firebase-app.js"
//"https://www.gstatic.com/firebasejs/9.19.0/firebase-auth.js"
