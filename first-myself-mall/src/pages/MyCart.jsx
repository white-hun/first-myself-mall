import React, { useEffect, useState } from "react";
import CartProduct from "../components/CartProduct";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../service/firebaseConfig";

export default function MyCart() {
  const [cartProd, setCartProd] = useState([]);
  useEffect(() => {
    const getProd = async () => {
      const querySnapshot = await getDocs(collection(db, "board", "basket"));
      setCartProd(querySnapshot.docs.map((doc) => ({ ...doc.data() })));
    };
    getProd();
  }, []);

  return (
    <>
      {console.log(cartProd)}
      {cartProd && (
        <ul>
          {cartProd.map((item) => (
            <CartProduct key={item.id} product={item} />
          ))}
        </ul>
      )}
    </>
  );
}
