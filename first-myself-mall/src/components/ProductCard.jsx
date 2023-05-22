import React from "react";
import { useNavigate } from "react-router-dom";

export default function ProductCard({ product }) {
  const { name, price, category, imageUrl } = product;
  const navigate = useNavigate();
  const handleClick = () => navigate(`/products/${product.id}`, { state: { product } });
  return (
    <div onClick={handleClick} className="w-80">
      <img src={imageUrl} alt={name} />
      <p className="font-semibold">{name}</p>
      <div>{price}</div>
      <div className="font-">{category}</div>
    </div>
  );
}
