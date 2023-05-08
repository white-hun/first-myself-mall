import React, { useState } from "react";
import { collection, doc, setDoc } from "firebase/firestore";
import { db } from "../service/firebaseConfig";

export default function NewProduct() {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [kind, setKind] = useState("");
  const [size, setSize] = useState("");
  const [description, setDescription] = useState("");
  const handleName = (e) => setName(e.target.value);
  const handlePrice = (e) => setPrice(e.target.value);
  const handleKind = (e) => setKind(e.target.value);
  const handleSize = (e) => setSize(e.target.value);
  const handleDescription = (e) => setDescription(e.target.value);
  const board = collection(db, "board");
  const setBoard = async () =>
    await setDoc(doc(board, "items"), {
      name: name,
      price: price,
      category: kind,
      size: {
        default: {
          small: size.includes("s") === true && "s",
          medium: size.includes("m") === true && "m",
          large: size.includes("l") === true && "l",
          extralarge: size.includes("xl") === true && "xl",
          twoetxralarge: size.includes("xxl") === true && "xxl",
        },
      },
      description: description,
    });

  const handleSubmit = (e) => {
    e.preventDefault();
    setBoard();
    console.log(board?.items);
    setName("");
    setPrice("");
    setKind("");
    setSize("");
    setDescription("");
  };
  return (
    <form onSubmit={handleSubmit}>
      <h2>새로운 제품 등록</h2>
      <input type="text" placeholder="제품명" onChange={handleName} value={name} />
      <input type="text" placeholder="가격" onChange={handlePrice} value={price} />
      <input type="text" placeholder="카테고리" onChange={handleKind} value={kind} />
      <input type="text" placeholder="사이즈" onChange={handleSize} value={size} />
      <input type="text" placeholder="제품설명" onChange={handleDescription} value={description} />
      <button>제품 등록하기</button>
    </form>
  );
}
