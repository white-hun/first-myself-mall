import { createContext, useContext } from "react";
import Product from "../api/product";
import ProductClient from "../api/productClient";

export const ProductContext = createContext();

const client = new ProductClient();
const product = new Product(client);

export function ProductProvider({ children }) {
  return <ProductContext.Provider value={{ product }}>{children}</ProductContext.Provider>;
}

export function useProduct() {
  return useContext(ProductContext);
}
