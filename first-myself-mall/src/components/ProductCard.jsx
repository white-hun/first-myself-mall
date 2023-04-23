import React from "react";
import { useNavigate } from "react-router-dom";

export default function ProductCard({ product }) {
  const { title, price, kind, imageurl } = product.snippet;
  const navigate = useNavigate();
  const handleClick = () => navigate(`/products/${product.id}`, { state: { product } });
  return (
    <div onClick={handleClick}>
      <img src={imageurl} alt={title} />
      <p>{title}</p>
      <div>{price}</div>
      <div>{kind}</div>
    </div>
  );
}
