import React from "react";
import { Link, useNavigate } from "react-router-dom";
import Login from "./Login";

export default function Header() {
  const navigate = useNavigate();
  const hanbleClick = () => navigate("/product");
  return (
    <header>
      <Link to="/">
        <p>shoppy</p>
      </Link>
      <div>
        <button onClick={hanbleClick}>products</button>
        <button>장바구니</button>
        <div>
          <Login />
        </div>
      </div>
    </header>
  );
}
