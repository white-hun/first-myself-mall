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
import { collection, doc, getDoc, setDoc } from "firebase/firestore";
import { database } from "../service/firebaseConfig";

const docRef = doc(database, "items", "WJbgIOwM9GRUzddXOhUD");
const docSnap = await getDoc(docRef);

if (docSnap.exists()) {
  console.log("Document data:", docSnap.data());
} else {
  // doc.data() will be undefined in this case
  console.log("No such document!");
}

export default function Home() {
  return <div>test</div>;
}
