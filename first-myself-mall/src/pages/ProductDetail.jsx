import { collection, doc, setDoc } from "firebase/firestore";
import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { db } from "../service/firebaseConfig";
import { v4 as uuidv4 } from "uuid";

export default function ProductDetail() {
  const {
    state: { product },
  } = useLocation();
  const { imageurl, name, category, price, description, size } = product;
  const [quantity, setQuantity] = useState(1);
  const [selected, setSelected] = useState();
  const board = collection(db, "board");
  const setBoard = async () =>
    await setDoc(
      doc(board, "basket"),
      {
        id: uuidv4(),
        name: name,
        price: price * quantity,
        category: category,
        quantity: quantity,
        size: selected, // size중 선택한 옵션
        description: description,
      },
      { merge: true }
    );
  const handleBasket = (e) => {
    e.preventDefault();
    setBoard();
    setQuantity();
    setSelected("");
    console.log(selected);
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
      {/* <article>
        <img src={imageurl} alt={name} />
      </article> */}
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
          {Object.entries(size.default).map(([key, value]) => (
            <option key={product.id} value={key}>
              {value}
            </option>
          ))}
        </select>
        <form onSubmit={handleBasket}>
          <button>장바구니</button>
        </form>
        <button>구매하기</button>
      </article>
    </section>
  );
}
