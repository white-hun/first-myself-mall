import { getAuth, signOut } from "firebase/auth";
import React from "react";

export default function Logout() {
  const handleGoogleLogOut = () => {
    const auth = getAuth();
    signOut(auth);
  };

  return <button onClick={handleGoogleLogOut}></button>;
}
