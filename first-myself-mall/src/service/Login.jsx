import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth, db, onUserStateChanged } from "../service/firebaseConfig";
import {
  GoogleAuthProvider,
  getAuth,
  onAuthStateChanged,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { BsPencilFill } from "react-icons/bs";
import { GrShop } from "react-icons/gr";
import { doc, setDoc } from "firebase/firestore";

export default function Login() {
  const [userData, setUserData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    onUserStateChanged((user) => {
      console.log(user);
      setUserData(user);
    });
  }, []);

  // 구글 로그인------------------------------------------
  const handleGoogleLogin = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider).then((data) => {
      setUserData(data.user);
      navigate("/");
    });
  };

  const setUserInfo = async () => {
    userData.email === "whiteforcoding@gmail.com"
      ? await setDoc(
          doc(db, "users", "admin", `${userData.uid}`, "adminInfo"),
          {
            name: userData.displayName,
            photoURL: userData.photoURL,
            email: userData.email,
          },
          { merge: true }
        )
      : await setDoc(
          doc(db, "users", "user", `${userData.uid}`, "userInfo"),
          {
            name: userData.displayName,
            photoURL: userData.photoURL,
            email: userData.email,
          },
          { merge: true }
        );
  };

  useEffect(() => {
    setUserInfo();
  }, []);

  const handleCart = () =>
    onAuthStateChanged(auth, (user) => {
      user != null ? navigate(`/carts/${userData.uid}`) : alert("로그인 해주세요.");
    });

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
      {userData != null ? (
        <div className="flex items-center">
          {userData.email === "whiteforcoding@gmail.com" ? (
            <button onClick={handleNewProduct}>
              <BsPencilFill />
            </button>
          ) : (
            <button onClick={handleCart}>
              <GrShop />
            </button>
          )}
          <img
            src={userData.photoURL}
            alt={userData.displayName}
            className="w-7 ml-4 mr-2 rounded-full"
          />
          <p className="mr-4 sm:text-xl lg:text-2xl 2xl:text-2xl">{`${
            userData && userData.displayName
          } 님`}</p>
          <button
            onClick={handleGoogleLogOut}
            className="hover:text-red-600 hover:scale-105 transition ease-in-out duration-300"
          >
            Logout
          </button>
        </div>
      ) : (
        <button
          onClick={handleGoogleLogin}
          className="hover:text-blue-600 hover:scale-105 transition ease-in-out duration-300"
        >
          Login
        </button>
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

//userData.email === "whiteforcoding@gmail.com"

// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { auth } from "../service/firebaseConfig";
// import { GoogleAuthProvider, getAuth, signInWithPopup, signOut } from "firebase/auth";
// import { BsPencilFill } from "react-icons/bs";

// export default function Login() {
//   const [userData, setUserData] = useState(null);
//   // const { displayName, photoURL } = userData;
//   const navigate = useNavigate();
//   const handleGoogleLogin = () => {
//     const provider = new GoogleAuthProvider();
//     signInWithPopup(auth, provider).then((data) => {
//       setUserData(data.user);
//       console.log(data);
//     });
//   };
//   const handleGoogleLogOut = () => {
//     const auth = getAuth();
//     signOut(auth);
//     setUserData(null);
//     navigate("/");
//   };
//   const handleNewProduct = () => {
//     navigate("/products/new");
//   };

//   return (
//     <div>
//       {userData.email === "whiteforcoding@gmail.com" ? (
//         <div>
//           <button onClick={handleNewProduct}>
//             <BsPencilFill />
//           </button>
//           <img src={userData.photoURL} alt={userData.displayName} />
//           <p>{`${userData && userData.displayName} 님`}</p>
//           <button onClick={handleGoogleLogOut}>Logout</button>
//         </div>
//       ) : <button onClick={handleGoogleLogin}>Login</button> || userData.email ? (
//         <div>
//           <img src={userData.photoURL} alt={userData.displayName} />
//           <p>{`${userData && userData.displayName} 님`}</p>
//           <button onClick={handleGoogleLogOut}>Logout</button>
//         </div>
//       ) : (
//         <button onClick={handleGoogleLogin}>Login</button>
//       )}
//     </div>
//   );
// }
