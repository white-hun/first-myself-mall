import React from "react";
import { useNavigate } from "react-router-dom";

export default function ProductCard({ product }) {
  const { name, price, category, imageUrl } = product;
  const navigate = useNavigate();
  const handleClick = () => navigate(`/products/${product.id}`, { state: { product } });

  return (
    <div onClick={handleClick} className="w-64">
      <img src={imageUrl} alt={name} className="rounded-md" />
      <p className="font-semibold">{name}</p>
      <div>{price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</div>
      <div>{category}</div>
    </div>
  );
}
