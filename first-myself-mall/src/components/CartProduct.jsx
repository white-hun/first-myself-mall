import React from "react";
import { useNavigate } from "react-router-dom";

export default function CartProduct({ product }) {
  const { name, price, category, size, quantity, imageUrl } = product;
  const navigate = useNavigate();
  const handleClick = () => navigate(`/products/${product.id}`, { state: { product } });

  return (
    <section className="my-5">
      <article className="flex">
        <div onClick={handleClick}>
          <img src={imageUrl} alt={name} className="rounded-md w-52" />
        </div>
        <div className="mx-5">
          <p>{name}</p>
          <div>{price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}원</div>
          <div>{category}</div>
          <div>{size}</div>
          <div>{quantity}</div>
        </div>
      </article>
    </section>
  );
}
