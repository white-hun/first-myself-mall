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
// import React from "react";
// import { db } from "../service/firebaseConfig";
// import { doc, getDoc } from "firebase/firestore";

// const docRef = doc(db, "cities", "SF");
// const docSnap = await getDoc(docRef);

// if (docSnap.exists()) {
//   console.log("Document data:", docSnap.data());
// } else {
//   // doc.data() will be undefined in this case
//   console.log("No such document!");
// }

// export default function Home() {
//   return <div>test</div>;
// }

//----------------------------------------------------------------------------------------------------

// import React, { useEffect, useState } from "react";
// import Banner from "../components/Banner";
// import { useQuery } from "react-query";
// import ProductCard from "../components/ProductCard";
// import { collection, getDocs } from "firebase/firestore";
// import { db } from "../service/firebaseConfig";

// export default function Home() {
//   const [prod, useProd] = useState([]);
//   useEffect(() => {
//     const getProd = async () => {
//       const querySnapshot = await getDocs(collection(db, "board"));
//       console.log(querySnapshot);
//     };
//     getProd();
//   }, []);

//   return (
//     <>
//       {/* <Banner />
//       {isLoading && <p>Loading...</p>}
//       {error && <p>{error.message}</p>}
//       {prod && (
//         <ul>
//           {prod.map((item) => (
//             <ProductCard key={item.id} product={item} />
//           ))}
//         </ul>
//       )} */}
//     </>
//   );
// }

//----------------------------------------------------------------------------------------------------

import React, { useEffect, useState } from "react";
import Banner from "../components/Banner";
import { useQuery } from "react-query";
import ProductCard from "../components/ProductCard";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../service/firebaseConfig";

export default function Home() {
  const [prod, setProd] = useState([]);
  useEffect(() => {
    const getProd = async () => {
      const querySnapshot = await getDocs(collection(db, "board"));
      setProd(querySnapshot.docs.map((doc) => ({ ...doc.data() })));
    };
    getProd();
  }, []);

  return (
    <>
      <Banner />
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
