import React from "react";
import { useNavigate } from "react-router-dom";

export default function ProductCard({ product }) {
  const { name, price, category, imageUrl } = product;
  const navigate = useNavigate();
  const handleClick = () => navigate(`/products/${product.id}`, { state: { product } });
  return (
    <div onClick={handleClick}>
      <img src={imageUrl} alt={name} />
      <p>{name}</p>
      <div>{price}</div>
      <div>{category}</div>
    </div>
  );
}
