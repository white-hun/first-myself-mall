import React from "react";
import { useProduct } from "../context/ProductContext";
import { useQuery } from "react-query";
import ProductCard from "../components/ProductCard";

export default function AllProducts() {
  const { product } = useProduct();
  const { isLoading, error, data: prod } = useQuery(["prod"], () => product.test());
  //
  return (
    <>
      {isLoading && <p>Loading...</p>}
      {error && <p>{error.message}</p>}
      {prod && (
        <ul>
          {prod.map((item) => (
            <ProductCard key={item.id} product={item} />
          ))}
        </ul>
      )}
    </>
  );
}
