// import React from "react";
// import Banner from "../components/Banner";
// import { useQuery } from "react-query";
// import { useProduct } from "../context/ProductContext";
// import ProductCard from "../components/ProductCard";

// export default function Home() {
//   const { product } = useProduct();
//   const { isLoading, error, data: prod } = useQuery(["prod"], () => product.test());
//   //
//   return (
//     <>
//       <Banner />
//       {isLoading && <p>Loading...</p>}
//       {error && <p>{error.message}</p>}
//       {prod && (
//         <ul>
//           {prod.map((item) => (
//             <ProductCard key={item.id} product={item} />
//           ))}
//         </ul>
//       )}
//     </>
//   );
// }

// async () => {
//   return fetch("/data/products.json")
//     .then((res) => res.json())
//     .then((data) => data.items);
// }

//----------------------------------------------------------------------------------------------------
import React from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../service/firebaseConfig";

const querySnapshot = async () => {
  return await getDocs(collection(db, "board"));
};
querySnapshot.forEach((doc) => {
  console.log(doc.id, " => ", doc.data());
});

export default function Home() {
  return <div>test</div>;
}
