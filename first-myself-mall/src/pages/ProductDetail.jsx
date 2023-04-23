import React from "react";
import { useLocation } from "react-router-dom";

export default function ProductDetail() {
  const {
    state: { product },
  } = useLocation();
  const { imageurl, title, price, description, size } = product.snippet;
  return (
    <section>
      <article>
        <img src={imageurl} alt={title} />
      </article>
      <article>
        <h2>{title}</h2>
        <p>{price}</p>
        <p>{description}</p>
        <label htmlFor="size"></label>
        <select id="size">
          <option value="">--pleae choose a size--</option>
          {Object.entries(size.option).map(([key, value]) => (
            <option key={product.id} value={key}>
              {value}
            </option>
          ))}
        </select>
        <button>장바구니에 추가하기</button>
      </article>
    </section>
  );
}
