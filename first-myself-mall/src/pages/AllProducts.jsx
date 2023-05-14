import React, { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../service/firebaseConfig";

export default function AllProducts() {
  const [prod, setProd] = useState([]);
  useEffect(() => {
    const getProd = async () => {
      const querySnapshot = await getDoc(doc(db, "board", "items"));

      setProd(querySnapshot.data());
      console.log(querySnapshot);
      // setProd(querySnapshot.docs.map((doc) => ({ ...doc.data() })));
    };
    getProd();
  }, []);

  return (
    <>
      {prod && (
        <ul>
          {Array(prod).map((item) => (
            <ProductCard key={item.id} product={item} />
          ))}
        </ul>
      )}
    </>
  );
}
