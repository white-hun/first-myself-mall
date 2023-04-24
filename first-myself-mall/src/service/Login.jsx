import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../service/firebaseConfig";
import { GoogleAuthProvider, getAuth, signInWithPopup, signOut } from "firebase/auth";
import { BsPencilFill } from "react-icons/bs";

export default function Login() {
  const [userData, setUserData] = useState(null);
  // const { displayName, photoURL } = userData;
  const navigate = useNavigate();
  const handleGoogleLogin = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider).then((data) => {
      setUserData(data.user);
      console.log(data);
    });
  };
  const handleGoogleLogOut = () => {
    const auth = getAuth();
    signOut(auth);
    setUserData(null);
    navigate("/");
  };
  const handleNewProduct = () => {
    navigate("/products/new");
  };

  return (
    <div>
      {userData ? (
        <div>
          <button onClick={handleNewProduct}>
            <BsPencilFill />
          </button>
          <img src={userData.photoURL} alt={userData.displayName} />
          <p>{`${userData && userData.displayName} 님`}</p>
          <button onClick={handleGoogleLogOut}>Logout</button>
        </div>
      ) : (
        <button onClick={handleGoogleLogin}>Login</button>
      )}
    </div>
  );
}

// .then((result) => {
//   // This gives you a Google Access Token. You can use it to access the Google API.
//   const credential = GoogleAuthProvider.credentialFromResult(result);
//   const token = credential.accessToken;
//   // The signed-in user info.
//   const user = result.user;
//   // IdP data available using getAdditionalUserInfo(result)
//   // ...
// })
// .catch((error) => {
//   // Handle Errors here.
//   const errorCode = error.code;
//   const errorMessage = error.message;
//   // The email of the user's account used.
//   const email = error.customData.email;
//   // The AuthCredential type that was used.
//   const credential = GoogleAuthProvider.credentialFromError(error);
//   // ...
// });
