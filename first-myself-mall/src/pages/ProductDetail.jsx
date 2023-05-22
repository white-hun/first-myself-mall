import { collection, doc, setDoc } from "firebase/firestore";
import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { auth, db } from "../service/firebaseConfig";
import { v4 as uuidv4 } from "uuid";
import { onAuthStateChanged } from "firebase/auth";

export default function ProductDetail() {
  const {
    state: { product },
  } = useLocation();
  const { imageUrl, name, category, price, description, size } = product;
  // const [ small, medium, large, extralarge, doubleextralarge ] = size.default;
  const [quantity, setQuantity] = useState(1);
  const [selected, setSelected] = useState();

  const board = collection(db, "board", "basket", "basketItems");
  const setBoard = async () =>
    await setDoc(
      doc(board, "basket"),
      {
        id: uuidv4(),
        imageUrl: imageUrl,
        name: name,
        price: price * quantity,
        category: category,
        quantity: quantity,
        size: selected, // size중 선택한 옵션
        description: description,
      },
      { merge: true }
    );

  const handleBasketFunction = () => {
    setBoard();
    setQuantity(1);
    setSelected("");
    console.log(selected);
  };

  const handleBasket = (e) => {
    onAuthStateChanged(auth, (user) => {
      user != null ? handleBasketFunction() : alert("로그인 해주세요");
    });
    e.preventDefault();
  };

  const handleMinus = () => {
    setQuantity(quantity - 1);
  };

  const handlePlus = () => {
    setQuantity(quantity + 1);
  };

  const handleSelect = (e) => setSelected(e.target.value);

  return (
    <section className="flex text-2xl mx-36">
      <article className="w-5/12">
        <img src={imageUrl} alt={name} />
      </article>
      <article className="mx-24 my-5">
        <div className="flex items-center">
          <h2 className="font-semibold my-4 text-4xl mr-10">{name}</h2>
          <p className="my-4 text-gray-300">{category}</p>
        </div>
        <p className="my-10">{price * quantity}원</p>
        <p className="my-10">{description}</p>
        <el htmlFor="size"></el>
        <select
          id="size"
          onChange={handleSelect}
          value={selected}
          className="border-solid border-2 border-lightgray-400 rounded-md my-10"
        >
          <option value="">--pleae choose a size--</option>
          <option value="">{size.default.small}</option>
          <option value="">{size.default.medium}</option>
          <option value="">{size.default.large}</option>
          <option value="">{size.default.extralarge}</option>
          <option value="">{size.default.doubleextralarge}</option>
          {/* {Object.entries(size.default).map(([key, value]) => (
            <option key={product.id} value={value}>
              {value}
            </option>
          ))} */}
        </select>
        <div className="flex items-center my-4">
          {quantity >= 2 ? (
            <button onClick={handleMinus}>-</button>
          ) : (
            <button
              disabled
              className="flex text-3xl mr-3 px-3 border-solid border-2 border-lightgray-400 rounded-md w-10 justify-center"
            >
              -
            </button>
          )}
          <p className="mx-5">{quantity}</p>
          <button
            onClick={handlePlus}
            className="flex mx-3 px-3 border-solid border-2 border-lightgray-400 rounded-md w-10 justify-center"
          >
            +
          </button>
        </div>
        <div className="flex my-10">
          <form onSubmit={handleBasket}>
            <button className="border-solid border-2 border-lightgray-600 rounded-md mr-4 px-3">
              장바구니
            </button>
          </form>
          <button className="border-solid border-2 border-lightgray-600 rounded-md px-3">
            구매하기
          </button>
        </div>
      </article>
    </section>
  );
}
