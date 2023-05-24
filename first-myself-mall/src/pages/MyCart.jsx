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
    <section className="flex mt-36 mx-12">
      <article className="w-9/12">
        {cartProd && (
          <ul>
            {cartProd.map((item) => (
              <CartProduct key={item.id} product={item} />
            ))}
          </ul>
        )}
        {/* {console.log(cartProd)} */}
      </article>
      <article>
        <h2>결제 정보</h2>
        <p>구매할 상품</p>
        {cartProd && (
          <ul>
            {cartProd.map((item) => (
              <li key={item.id}>{item.name}</li>
            ))}
          </ul>
        )}
        <p>총 수량</p>
        <p>합계 금액</p>
        <button>구매하기</button>
      </article>
    </section>
  );
}
