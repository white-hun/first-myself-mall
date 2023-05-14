import React, { useEffect, useState } from "react";
import CartProduct from "../components/CartProduct";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../service/firebaseConfig";

export default function MyCart() {
  const [cartProd, setCartProd] = useState([]);
  useEffect(() => {
    const getProd = async () => {
      const querySnapshot = await getDoc(doc(db, "board", "basket"));
      // if (querySnapshot.exists()) {
      //   console.log("Document data:", querySnapshot.data());
      // } else {
      //   // querySnapshot.data() will be undefined in this case
      //   console.log("No such document!");
      // }
      setCartProd(querySnapshot.data());
      console.log(querySnapshot);
      // setProd(querySnapshot.docs.map((doc) => ({ ...doc.data() })));
    };
    getProd();
  }, []);

  return (
    <>
      {console.log(cartProd)}
      {cartProd && (
        <ul>
          {Array(cartProd).map((item) => (
            <CartProduct key={item.id} product={item} />
          ))}
        </ul>
      )}
    </>
  );
}
