import React from "react";
import { Link } from "react-router-dom";
import Login from "./Login";

export default function Header() {
  return (
    <header>
      <Link to="/">
        <p>shoppy</p>
      </Link>
      <div>
        <p>products</p>
        <p>장바구니</p>
        <Login />
      </div>
    </header>
  );
}
