import { getDatabase, set, ref } from "firebase/database";
import React, { useState } from "react";
import { collection, doc, setDoc } from "firebase/firestore";
import { db } from "../service/firebaseConfig";

export default function NewProduct() {
  const [title, setTitle] = useState("");
  const handleTitle = (e) => setTitle(e.target.value);
  const board = collection(db, "board");
  const setBoard = async () =>
    await setDoc(doc(board, "TST"), {
      name: title,
    });

  const handleSubmit = () => {
    setBoard(title);
    console.log(board);
    setTitle("");
  };
  return (
    <div>
      <h2>새로운 제품 등록</h2>
      <input type="text" placeholder="제품명" onChange={handleTitle} value={title} />

      <button onSubmit={handleSubmit}>제품 등록하기</button>
    </div>
  );
}

// const [price, setPrice] = useState("");
// const [kind, setKind] = useState("");
// const [description, setDescription] = useState("");
// const [size, setSize] = useState({ default: {} });

// const handlePrice = (e) => setPrice(e.target.value);
// const handleKind = (e) => setKind(e.target.value);
// const handleDescription = (e) => setDescription(e.target.value);
// const handleSize = (e) => setSize(e.target.value);

// <input type="text" placeholder="가격" onChange={handlePrice} />
// <input type="text" placeholder="카테고리" onChange={handleKind} />
// <input type="text" placeholder="제품 설명" onChange={handleDescription} />
// <input type="text" placeholder="사이즈 옵션" onChange={handleSize} />

//-------------------------------------------------------------------------------------------
// import { collection, doc, setDoc } from "firebase/firestore";
// import React from "react";
// import { db } from "../service/firebaseConfig";

// const citiesRef = collection(db, "cities");

// const tes = async () =>
//   await setDoc(doc(citiesRef, "SF"), {
//     name: "San Francisco",
//     state: "CA",
//     country: "USA",
//     capital: false,
//     population: 860000,
//     regions: ["west_coast", "norcal"],
//   });
// console.log(citiesRef);

// export default function NewProduct() {
// const handleSubmit = () => tes();

//  await setDoc(doc(citiesRef, "LA"), {
//   name: "Los Angeles",
//   state: "CA",
//   country: "USA",
//   capital: false,
//   population: 3900000,
//   regions: ["west_coast", "socal"],
// });
// await setDoc(doc(citiesRef, "DC"), {
//   name: "Washington, D.C.",
//   state: null,
//   country: "USA",
//   capital: true,
//   population: 680000,
//   regions: ["east_coast"],
// });
// await setDoc(doc(citiesRef, "TOK"), {
//   name: "Tokyo",
//   state: null,
//   country: "Japan",
//   capital: true,
//   population: 9000000,
//   regions: ["kanto", "honshu"],
// });
// await setDoc(doc(citiesRef, "BJ"), {
//   name: "Beijing",
//   state: null,
//   country: "China",
//   capital: true,
//   population: 21500000,
//   regions: ["jingjinji", "hebei"],
// });
//   return (
//     <div>
//       <h2>새로운 제품 등록</h2>
//       <button onSubmit={handleSubmit}>제품 등록하기</button>
//     </div>
//   );
// }
