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
    <div>
      <h1 className="text-3xl mx-20 mt-24 mb-3 font-semibold">장바구니</h1>
      <section className="flex mx-12">
        <article className="w-8/12">
          {cartProd && (
            <ul>
              {cartProd.map((item) => (
                <CartProduct key={item.id} product={item} />
              ))}
            </ul>
          )}
          {/* {console.log(cartProd)} */}
        </article>
        <article className="w-1/4 text-xl mx-10 my-7">
          <h2 className="text-2xl font-semibold border-b border-gray-200 my-3">결제 정보</h2>
          <p className="font-semibold my-3">구매할 상품</p>
          {cartProd && (
            <ul className="border-b border-gray-200 pb-40">
              {cartProd.map((item) => (
                <li key={item.id}>{item.name}</li>
              ))}
            </ul>
          )}
          <div className="my-3">
            <p className="font-semibold mt-4">합계 금액</p>
            <p className="border-b border-gray-200 pb-3 my-2">합계 금액</p>
          </div>
          <button className="w-56 mr-4 py-3 border-solid border-2 border-gray-200 hover:border-gray-700 rounded-md">
            구매하기
          </button>
        </article>
      </section>
    </div>
  );
}

// 수량 버튼 추가
// 합계 금액 함수 추가
