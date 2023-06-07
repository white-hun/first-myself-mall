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
      setProd(querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };
    getProd();
  }, []);

  return (
    <div className="px-20 flex justify-center">
      {prod && (
        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 3xl:grid-cols-5 gap-10 gap-y-3">
          {prod.map((item) => (
            <ProductCard key={item.id} product={item} />
          ))}
        </ul>
      )}
    </div>
  );
}
