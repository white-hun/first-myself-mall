import { auth } from "../firebaseConfig";
import React from "react";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";

export default function Login() {
  const handleGoogleLogin = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider);
  };

  return <button onClick={handleGoogleLogin}>Login</button>;
}
