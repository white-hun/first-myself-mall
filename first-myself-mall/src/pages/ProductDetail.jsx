import { addDoc, collection } from "firebase/firestore";
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
  const [selected, setSelected] = useState("");

  const board = collection(db, "board", "basket", "basketItems");
  const setBoard = async () =>
    await addDoc(
      board,
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

  const handleSelect = (e) => {
    setSelected(e.target.value);
    e.preventDefault();
    console.log(e.target.value);
    // console.log(selected);
  };

  const handleBasketFunction = () => {
    setBoard();
    setQuantity(1);
    setSelected("");
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

  return (
    <section className="grid lg:grid-cols-1 xl:grid-cols-2 text-2xl mx-36">
      <article className="w-10/12 mx-10">
        <img src={imageUrl} alt={name} className="rounded-lg" />
      </article>
      <article className="w-10/12 my-24 mx-10">
        <div className="flex items-end border-b border-gray-200">
          <h2 className="font-semibold py-4 text-4xl mr-5">{name}</h2>
          <p className="my-4 text-gray-200 text-xl">{category}</p>
        </div>
        <p className="py-7 border-b border-gray-200">
          {(price * quantity).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}원
        </p>
        <p className="py-8 border-b border-gray-200">{description}</p>
        <label htmlFor="size"></label>
        <select
          id="size"
          onChange={handleSelect}
          value={selected}
          className="border-solid border-2 border-gray-200 rounded-md my-7 py-2 focus:outline-none hover:border-gray-700"
        >
          <option value="">-- please choose a size --</option>
          <option value={size.default.small}>{size.default.small}</option>
          <option value={size.default.medium}>{size.default.medium}</option>
          <option value={size.default.large}>{size.default.large}</option>
          <option value={size.default.extralarge}>{size.default.extralarge}</option>
          <option value={size.default.doubleextralarge}>{size.default.doubleextralarge}</option>
          {/* {Object.entries(size.default).map(([key, value]) => (
            <option key={product.id} value={value}>
              {value}
            </option>
          ))} */}
        </select>
        <div className="flex items-center py-5 border-b border-gray-200">
          {quantity >= 2 ? (
            <button
              onClick={handleMinus}
              className="flex text-3xl mr-3 px-3 border-solid border-2 border-gray-700 rounded-md w-10 h-10 justify-center"
            >
              -
            </button>
          ) : (
            <button
              disabled
              className="flex text-3xl mr-3 px-3 border-solid border-2 border-gray-200 text-gray-300 rounded-md w-10 h-10 justify-center"
            >
              -
            </button>
          )}
          <p className="mx-5">{quantity}</p>
          <button
            onClick={handlePlus}
            className="flex mx-3 px-3 border-solid border-2 border-gray-700 rounded-md w-10 h-10 justify-center"
          >
            +
          </button>
        </div>
        <div className="flex my-10 justify-between">
          <form onSubmit={handleBasket}>
            <button className="mr-4 px-24 py-3 border-solid border-2 border-gray-200 hover:border-gray-700 rounded-md">
              장바구니
            </button>
          </form>
          <button className="px-24 py-3 border-solid border-2 border-gray-200 hover:border-gray-700 rounded-md">
            구매하기
          </button>
        </div>
      </article>
    </section>
  );
}
