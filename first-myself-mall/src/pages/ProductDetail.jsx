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
    <section>
      <article>
        <img src={imageUrl} alt={name} />
      </article>
      <article>
        <h2>{name}</h2>
        <p>{category}</p>
        <p>{price * quantity}</p>
        <p>{description}</p>
        <label htmlFor="size">size</label>
        <div>
          {quantity >= 2 ? <button onClick={handleMinus}>-</button> : <button disabled>-</button>}
          <p>{quantity}</p>
          <button onClick={handlePlus}>+</button>
        </div>
        <select id="size" onChange={handleSelect} value={selected}>
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
        <form onSubmit={handleBasket}>
          <button>장바구니</button>
        </form>
        <button>구매하기</button>
      </article>
    </section>
  );
}
