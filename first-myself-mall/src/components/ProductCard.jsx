import React from "react";
import { useNavigate } from "react-router-dom";

export default function ProductCard({ product }) {
  const { name, price, category, imageUrl } = product;
  const navigate = useNavigate();
  const handleClick = () => navigate(`/products/${product.id}`, { state: { product } });

  return (
    <div onClick={handleClick} className="w-64 mb-3 bg-gray-50 rounded-lg p-2">
      <img src={imageUrl} alt={name} className="rounded-lg mb-2" />
      <div className="mx-1">
        <div className="flex justify-between items-center">
          <p className="text-lg font-semibold">{name}</p>
          <div className="text-gray-400">{category}</div>
        </div>
        <div>{price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</div>
      </div>
    </div>
  );
}
