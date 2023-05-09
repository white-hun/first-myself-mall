import React from "react";
import { useLocation } from "react-router-dom";

export default function ProductDetail() {
  const {
    state: { product },
  } = useLocation();
  const { imageurl, name, category, price, description, size } = product;
  return (
    <section>
      {/* <article>
        <img src={imageurl} alt={name} />
      </article> */}
      <article>
        <h2>{name}</h2>
        <p>{category}</p>
        <p>{price}</p>
        <p>{description}</p>
        <label htmlFor="size">size</label>
        <select id="size">
          <option value="">--pleae choose a size--</option>
          {Object.entries(size.option).map(([key, value]) => (
            <option key={product.id} value={key}>
              {value}
            </option>
          ))}
        </select>
        <button>장바구니</button>
        <button>구매하기</button>
      </article>
    </section>
  );
}
