import React from "react";
import { useNavigate } from "react-router-dom";

export default function CartProduct({ product }) {
  const { name, price, category, size, quantity, imageUrl } = product;
  const navigate = useNavigate();
  const handleClick = () => navigate(`/products/${product.id}`, { state: { product } });

  return (
    <div>
      <div onClick={handleClick}>
        <img src={imageUrl} alt={name} className="w-52" />
      </div>
      <p>{name}</p>
      <div>{price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}원</div>
      <div>{category}</div>
      <div>{size}</div>
      <div>{quantity}</div>
    </div>
  );
}
