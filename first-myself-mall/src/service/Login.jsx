import React from "react";
import { auth } from "../service/firebaseConfig";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";

export default function Login() {
  function handleGoogleLogin() {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider);
  }
  return <button onClick={handleGoogleLogin}>Login</button>;
}
