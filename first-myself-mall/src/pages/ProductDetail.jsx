import { addDoc, collection } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { auth, db } from "../service/firebaseConfig";
import { v4 as uuidv4 } from "uuid";
import { onAuthStateChanged } from "firebase/auth";

export default function ProductDetail() {
  const {
    state: { product },
  } = useLocation();
  const { id, imageUrl, name, category, price, description, size } = product;
  // const [ small, medium, large, extralarge, doubleextralarge ] = size.default;
  const [quantity, setQuantity] = useState(1);
  const [selected, setSelected] = useState("");
  const [uid, setUid] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUid(user.uid);
    });
    return () => unsubscribe();
  }, []);

  // onAuthStateChanged(auth, (user) => {
  //   setUid(user.uid);
  // });

  const setCart = async () =>
    await addDoc(
      collection(db, "users", "user", `${uid}`, "userBasket", "basket"),
      {
        id: uuidv4(),
        imageUrl: imageUrl,
        name: name,
        price: price * quantity,
        category: category,
        quantity: quantity,
        size: selected,
        description: description,
      },
      { merge: true }
    );

  const handleSelect = (e) => {
    setSelected(e.target.value);
    e.preventDefault();
    console.log(e.target.value);
    // console.log(selected);
  };

  const confirm = () => {
    const ok = window.confirm("상품을 장바구니에 담았습니다. 장바구니로 가시겠습니까?");
    ok ? navigate("/carts") : navigate("/");
  };

  const handleBasketFunction = () => {
    onAuthStateChanged(auth, (user) => {
      setUid(user.uid);
    });
    setCart();
    setQuantity(1);
    setSelected("");
    confirm();
  };

  const handleBasket = (e) => {
    onAuthStateChanged(auth, (user) => {
      user != null ? handleBasketFunction() : alert("로그인 해주세요");
    });
    e.preventDefault();
  };

  const handleMinus = () => {
    setQuantity(quantity - 1);
  };

  const handlePlus = () => {
    setQuantity(quantity + 1);
  };

  return (
    <section className="grid lg:grid-cols-1 xl:grid-cols-2 text-2xl mx-36 mt-20">
      <article className="w-10/12 mx-10">
        <img src={imageUrl} alt={name} className="rounded-lg" />
      </article>
      <article className="w-11/12 my-20 mx-10">
        <div className="flex items-end border-b border-gray-200">
          <h2 className="font-semibold py-4 text-4xl mr-5">{name}</h2>
          <p className="my-4 text-gray-200 text-xl">{category}</p>
        </div>
        <p className="py-7 border-b border-gray-200">{(price * quantity).toLocaleString()}원</p>
        <p className="py-8 border-b border-gray-200">{description}</p>
        <label htmlFor="size"></label>
        <select
          id="size"
          onChange={handleSelect}
          value={selected}
          required
          className="border-solid border-2 border-gray-200 rounded-md my-7 py-2 focus:outline-none hover:border-gray-700 transition ease-in-out"
        >
          <option value="">-- please choose a size --</option>
          <option value={size.default.small}>{size.default.small}</option>
          <option value={size.default.medium}>{size.default.medium}</option>
          <option value={size.default.large}>{size.default.large}</option>
          <option value={size.default.extralarge}>{size.default.extralarge}</option>
          <option value={size.default.doubleextralarge}>{size.default.doubleextralarge}</option>
          {/* {Object.entries(size.default).map(([key, value]) => (
            <option key={product.id} value={value}>
              {value}
            </option>
          ))} */}
        </select>
        <div className="flex items-center py-5 border-b border-gray-200">
          {quantity >= 2 ? (
            <button
              onClick={handleMinus}
              className="flex text-3xl mr-3 px-3 border-solid border-2 border-gray-700 rounded-md w-10 h-10 justify-center hover:scale-95 transition ease-in-out duration-300"
            >
              -
            </button>
          ) : (
            <button
              disabled
              className="flex text-3xl mr-3 px-3 border-solid border-2 border-gray-200 text-gray-300 rounded-md w-10 h-10 justify-center"
            >
              -
            </button>
          )}
          <p className="mx-5">{quantity}</p>
          <button
            onClick={handlePlus}
            className="flex mx-3 px-3 border-solid border-2 border-gray-700 rounded-md w-10 h-10 justify-center hover:scale-95 transition ease-in-out duration-300"
          >
            +
          </button>
        </div>
        <div className="grid grid-cols-2 gap-3 my-10">
          <button
            onClick={handleBasket}
            className="px-20 py-3 border-solid border-2 border-gray-200 hover:border-gray-700 rounded-md hover:scale-105 transition ease-in-out duration-300"
          >
            장바구니
          </button>
          <button className="py-3 border-solid border-2 border-gray-200 hover:border-gray-700 rounded-md hover:scale-105 transition ease-in-out duration-300">
            구매하기
          </button>
        </div>
      </article>
    </section>
  );
}
