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
          <option value="">{size.option.small}</option>
          <option value="">{size.option.medium}</option>
          <option value="">{size.option.large}</option>
          <option value="">{size.option.xlarge}</option>
          <option value="">{size.option.xxlarge}</option>
        </select>
      </article>
    </section>
  );
}

{
  /* {size.option.map((s) => (
  <option value={product.id}>{s}</option>
))} */
}
