import React from "react";
import { Link, useNavigate } from "react-router-dom";
import Login from "../service/Login";
import { BsShop } from "react-icons/bs";

export default function Header() {
  const navigate = useNavigate();
  const handleProducts = () => navigate("/product");

  return (
    <header className="w-full flex mb-5 px-4 pt-7 pb-6 text-2xl justify-between border-b border-gray-300 ">
      <Link to="/" className="flex items-center">
        <BsShop />
        <p className="ml-2">shoppy</p>
      </Link>
      <div className="flex space-x-5">
        <button onClick={handleProducts}>products</button>
        <div>
          <Login />
        </div>
      </div>
    </header>
  );
}
