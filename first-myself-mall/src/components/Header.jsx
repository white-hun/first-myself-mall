import React from "react";
import { Link, useNavigate } from "react-router-dom";
import Login from "../service/Login";
import { BsShop } from "react-icons/bs";
import { GrShop } from "react-icons/gr";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../service/firebaseConfig";

export default function Header() {
  const navigate = useNavigate();
  const handleProducts = () => navigate("/product");
  const handleCart = () =>
    onAuthStateChanged(auth, (user) => {
      user != null ? navigate("/carts") : alert("로그인 해주세요.");
    });
  return (
    <header>
      <Link to="/">
        <BsShop />
        <p>shoppy</p>
      </Link>
      <div>
        <button onClick={handleProducts}>products</button>
        <button onClick={handleCart}>
          <GrShop />
        </button>
        <div>
          <Login />
        </div>
      </div>
    </header>
  );
}

// admin 이면 새로운 제품 등록할 수 있는 수정버튼(제품등록 페이지)
