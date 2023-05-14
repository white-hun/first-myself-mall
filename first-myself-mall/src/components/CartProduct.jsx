import React from "react";

export default function CartProduct({ product }) {
  const { name, price, category, size, quantity, imageurl } = product;
  return (
    <div>
      {/* <img src={imageurl} alt={name} /> */}
      <p>{name}</p>
      <div>{price}</div>
      <div>{category}</div>
      <div>{size}</div>
      <div>{quantity}</div>
    </div>
  );
}
