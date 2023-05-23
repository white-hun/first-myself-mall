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

// import React, { useEffect, useState } from "react";
// import Banner from "../components/Banner";
// import ProductCard from "../components/ProductCard";
// import { doc, getDoc } from "firebase/firestore";
// import { db } from "../service/firebaseConfig";

// export default function Home() {
//   const [prod, setProd] = useState([]);
//   useEffect(() => {
//     const getProd = async () => {
//       const querySnapshot = await getDoc(doc(db, "board", "boardItems", "items"));
//       // if (querySnapshot.exists()) {
//       //   console.log("Document data:", querySnapshot.data());
//       // } else {
//       //   // querySnapshot.data() will be undefined in this case
//       //   console.log("No such document!");
//       // }
//       setProd(querySnapshot.data());
//       console.log(querySnapshot);
//       // setProd(querySnapshot.docs.map((doc) => ({ ...doc.data() })));
//     };
//     getProd();
//   }, []);

//   return (
//     <>
//       <Banner />
//       {/* {isLoading && <p>Loading...</p>}
//       {error && <p>{error.message}</p>} */}
//       {console.log(prod)}
//       {prod && (
//         <ul>
//           {Array(prod).map((item) => (
//             <ProductCard key={item.id} product={item} />
//           ))}
//         </ul>
//       )}
//     </>
//   );
// }

//----------------------------------------------------------------------------------------------------

import React, { useEffect, useState } from "react";
import Banner from "../components/Banner";
import ProductCard from "../components/ProductCard";
import { collection, getDocs, query } from "firebase/firestore";
import { db } from "../service/firebaseConfig";

export default function Home() {
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
      <div className="flex justify-center mb-10">
        <Banner />
      </div>
      <div className="flex justify-center">
        {prod && (
          <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 3xl:grid-cols-5 gap-10 gap-y-3">
            {prod.map((item) => (
              <ProductCard key={item.id} product={item} />
            ))}
          </ul>
        )}
        {console.log(prod)}
      </div>
    </>
  );
}
