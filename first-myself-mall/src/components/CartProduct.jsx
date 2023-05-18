import React from "react";

export default function CartProduct({ product }) {
  const { name, price, category, size, quantity, imageUrl } = product;
  return (
    <div>
      {/* <img src={imageUrl} alt={name} /> */}
      <p>{name}</p>
      <div>{price}</div>
      <div>{category}</div>
      <div>{size}</div>
      <div>{quantity}</div>
    </div>
  );
}
