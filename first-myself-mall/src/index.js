import React from "react";
import ReactDOM from "react-dom/client";
import reportWebVitals from "./reportWebVitals";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App";
import NotFound from "./pages/NotFound";
import Home from "./pages/Home";
import AllProducts from "./pages/AllProducts";
import NewProduct from "./pages/NewProduct";
import ProductDetail from "./pages/ProductDetail";
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
// const analytics = getAnalytics(app);

const auth = getAuth(app);

// Detect auth state
onAuthStateChanged(auth, (user) => {
  if (user != null) {
    console.log("logged in!");
  } else {
    console.log("No user");
  }
});

const router = createBrowserRouter([
  {
    path: "/",
    errorElement: <NotFound />,
    element: <App />,
    children: [
      { index: true, path: "/", element: <Home /> },
      { path: "/product", element: <AllProducts /> },
      { path: "/products/new", element: <NewProduct /> },
      { path: "/products/:id", element: <ProductDetail /> },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<RouterProvider router={router} />);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
