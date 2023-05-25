// import React, { useState } from "react";
// import { addDoc, collection } from "firebase/firestore";
// import { db } from "../service/firebaseConfig";
// import { v4 as uuidv4 } from "uuid";
// import Upload from "../service/Upload";

// export default function NewProduct() {
//   const [name, setName] = useState("");
//   const [price, setPrice] = useState("");
//   const [category, setCategory] = useState("");
//   const [size, setSize] = useState("");
//   const [description, setDescription] = useState("");
//   const [imageUrl, setImageUrl] = useState("");

//   const handleName = (e) => setName(e.target.value);
//   const handlePrice = (e) => setPrice(e.target.value);
//   const handleCategory = (e) => setCategory(e.target.value);
//   const handleSize = (e) => setSize(e.target.value);
//   const handleDescription = (e) => setDescription(e.target.value);

//   const parentFunction = (x) => {
//     setImageUrl(x);
//     // console.log(imageUrl);
//   };

//   const board = collection(db, "board", "boardItems", "items");
//   const setBoard = async () =>
//     await addDoc(
//       board,
//       {
//         id: uuidv4(),
//         imageUrl: imageUrl,
//         name: name,
//         price: price,
//         category: category,
//         size: {
//           default: {
//             small: size.includes("s") === true && "S",
//             medium: size.includes("m") === true && "M",
//             large: size.includes("l") === true && "L",
//             extralarge: size.includes("xl") === true && "XL",
//             doubleextralarge: size.includes("xxl") === true && "XXL",
//           },
//         },
//         description: description,
//       },
//       { merge: true }
//     );

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     setBoard();
//     console.log(board);
//     setName("");
//     setPrice("");
//     setCategory("");
//     setSize("");
//     setDescription("");
//     setImageUrl("");
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <h2>새로운 제품 등록</h2>
//       <Upload parentFunction={parentFunction} />
//       <input type="text" placeholder="제품명" onChange={handleName} value={name} required />
//       <input type="text" placeholder="가격" onChange={handlePrice} value={price} required />
//       <input
//         type="text"
//         placeholder="카테고리"
//         onChange={handleCategory}
//         value={category}
//         required
//       />
//       <input type="text" placeholder="사이즈" onChange={handleSize} value={size} required />
//       <input
//         type="text"
//         placeholder="제품설명"
//         onChange={handleDescription}
//         value={description}
//         required
//       />
//       <button>제품 등록하기</button>
//     </form>
//   );
// }

//--------------------------------------------------------------------------------------------------

// 하나의 state로 리펙토링 해보기

import React, { useState } from "react";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../service/firebaseConfig";
import { v4 as uuidv4 } from "uuid";
import Upload from "../service/Upload";

export default function NewProduct() {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [size, setSize] = useState("");
  const [description, setDescription] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  const handleName = (e) => setName(e.target.value);
  const handlePrice = (e) => setPrice(e.target.value);
  const handleCategory = (e) => setCategory(e.target.value);
  const handleSize = (e) => setSize(e.target.value);
  const handleDescription = (e) => setDescription(e.target.value);

  const parentFunction = (x) => {
    setImageUrl(x);
    // console.log(imageUrl);
  };

  const board = collection(db, "board", "boardItems", "items");
  const setBoard = async () =>
    await addDoc(
      board,
      {
        id: uuidv4(),
        imageUrl: imageUrl,
        name: name,
        price: price,
        category: category,
        size: {
          default: {
            small: size.includes("s") === true && "S",
            medium: size.includes("m") === true && "M",
            large: size.includes("l") === true && "L",
            extralarge: size.includes("xl") === true && "XL",
            doubleextralarge: size.includes("xxl") === true && "XXL",
          },
        },
        description: description,
      },
      { merge: true }
    );

  const handleSubmit = (e) => {
    e.preventDefault();
    setBoard();
    console.log(board);
    setName("");
    setPrice("");
    setCategory("");
    setSize("");
    setDescription("");
    setImageUrl("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>새로운 제품 등록</h2>
      <Upload parentFunction={parentFunction} />
      <div>
        <div className="flex">
          <p>상품명</p>
          <input
            type="text"
            onChange={handleName}
            value={name}
            required
            className="w-36 mr-4 1 border-solid border-2 border-gray-200 hover:border-gray-700 rounded-md"
          />
        </div>
        <div className="flex">
          <p>가격</p>
          <input
            type="text"
            onChange={handlePrice}
            value={price}
            required
            className="w-36 mr-4 1 border-solid border-2 border-gray-200 hover:border-gray-700 rounded-md"
          />
        </div>
        <div className="flex">
          <p>분류</p>
          <input
            type="text"
            onChange={handleCategory}
            value={category}
            required
            className="w-36 mr-4 1 border-solid border-2 border-gray-200 hover:border-gray-700 rounded-md"
          />
        </div>
        <div className="flex">
          <p>사이즈</p>
          <input
            type="text"
            onChange={handleSize}
            value={size}
            required
            className="w-36 mr-4 1 border-solid border-2 border-gray-200 hover:border-gray-700 rounded-md"
          />
        </div>
        <div className="flex">
          <p>제품설명</p>
          <input
            type="text"
            onChange={handleDescription}
            value={description}
            required
            className="w-36 mr-4 1 border-solid border-2 border-gray-200 hover:border-gray-700 rounded-md"
          />
        </div>
      </div>
      <button className="w-36 mr-4 py-1 border-solid border-2 border-gray-200 hover:border-gray-700 rounded-md">
        제품 등록하기
      </button>
    </form>
  );
}
