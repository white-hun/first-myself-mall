import React, { useEffect, useState } from "react";
import { useProduct } from "../context/ProductContext";
import { useQuery } from "react-query";
import ProductCard from "../components/ProductCard";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../service/firebaseConfig";

export default function AllProducts() {
  const [prod, setProd] = useState([]);
  useEffect(() => {
    const getProd = async () => {
      const querySnapshot = await getDocs(collection(db, "board"));
      setProd(querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };
    getProd();
  }, []);

  return (
    <>
      {/* {isLoading && <p>Loading...</p>}
      {error && <p>{error.message}</p>}
      {console.log(prod)}; */}
      {console.log(prod)}
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
