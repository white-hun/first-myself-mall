import React, { useEffect, useState } from "react";
import CartProduct from "../components/CartProduct";
import { collection, getDocs, query } from "firebase/firestore";
import { db } from "../service/firebaseConfig";

export default function MyCart() {
  const [cartProd, setCartProd] = useState([]);
  useEffect(() => {
    const getProd = async () => {
      const q = query(collection(db, "board", "basket", "basketItems"));
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        const docProd = { ...doc.data() };
        setCartProd((product) => [...product, docProd]);
      });
    };
    getProd();
  }, []);

  return (
    <>
      {cartProd && (
        <ul>
          {cartProd.map((item) => (
            <CartProduct key={item.id} product={item} />
          ))}
        </ul>
      )}
      {/* {console.log(cartProd)} */}
    </>
  );
}
