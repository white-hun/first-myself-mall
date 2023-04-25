import { getDatabase, set, ref } from "firebase/database";
import React, { useState } from "react";

export default function NewProduct() {
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [kind, setKind] = useState("");
  const [description, setDescription] = useState("");
  const [size, setSize] = useState({ default: {} });
  const handleTitle = (e) => setTitle(e.target.value);
  const handlePrice = (e) => setPrice(e.target.value);
  const handleKind = (e) => setKind(e.target.value);
  const handleDescription = (e) => setDescription(e.target.value);
  const handleSize = (e) => setSize(e.target.value);
  function writeUserData(title, price, kind, description, size) {
    const db = getDatabase();
    set(ref(db), {
      title,
      price,
      kind,
      description,
      size,
    });
  }
  const handleSubmit = () => writeUserData(title, price, kind, description, size);
  return (
    <div>
      <h2>새로운 제품 등록</h2>
      <input type="text" placeholder="제품명" onChange={handleTitle} />
      <input type="text" placeholder="가격" onChange={handlePrice} />
      <input type="text" placeholder="카테고리" onChange={handleKind} />
      <input type="text" placeholder="제품 설명" onChange={handleDescription} />
      <input type="text" placeholder="사이즈 옵션" onChange={handleSize} />
      <button onSubmit={handleSubmit}>제품 등록하기</button>
    </div>
  );
}
