import React from "react";
import { useNavigate } from "react-router-dom";

export default function CartProduct({ product }) {
  const { name, price, category, size, quantity, imageUrl } = product;
  const navigate = useNavigate();
  const handleClick = () => navigate(`/products/${product.id}`, { state: { product } });

  return (
    <section className="my-5">
      <article className="flex items-center bg-gray-50 rounded-xl p-2">
        <div onClick={handleClick}>
          <img src={imageUrl} alt={name} className="rounded-lg w-44" />
        </div>
        <div className="mx-5 text-xl">
          <div className="flex items-center">
            <p className="my-1 mr-2">{name}</p>
            <div className="text-sm text-gray-400">{category}</div>
          </div>
          <p className="my-1">사이즈 {size}</p>
          <div className="flex justify-between w-96">
            <p className="my-1">수량 {quantity}</p>
            <p className="my-1 font-semibold">
              {price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}원
            </p>
          </div>
        </div>
      </article>
    </section>
  );
}
