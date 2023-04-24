import React from "react";

export default function NewProduct() {
  const handleSubmit = () => {};
  return (
    <div>
      <h2>새로운 제품 등록</h2>
      <input type="text" placeholder="제품명" />
      <input type="text" placeholder="가격" />
      <input type="text" placeholder="카테고리" />
      <input type="text" placeholder="제품 설명" />
      <input type="text" placeholder="사이즈 옵션" />
      <button onSubmit={handleSubmit}>제품 등록하기</button>
    </div>
  );
}
