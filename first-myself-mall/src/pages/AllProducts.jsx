import React, { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";
import { collection, getDocs, query } from "firebase/firestore";
import { db } from "../service/firebaseConfig";

export default function AllProducts() {
  const [prod, setProd] = useState([]);
  useEffect(() => {
    const getProd = async () => {
      const q = query(collection(db, "board", "boardItems", "items"));
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        const docProd = { ...doc.data() };
        setProd((product) => [...product, docProd]);
      });
    };
    getProd();
  }, []);

  return (
    <>
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
