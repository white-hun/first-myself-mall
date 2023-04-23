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
          {size.option.map((s) => (
            <option>{s}</option>
          ))}
        </select>
      </article>
    </section>
  );
}
