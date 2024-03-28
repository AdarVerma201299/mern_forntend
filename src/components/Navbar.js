import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Badge from "react-bootstrap/Badge";
import Models from "../Models";
import Cart from "../Screen/Cart";
import { UseCart } from "./Contextreducer";

export default function Navbar() {
  const [cartView, setcartView] = useState(false);
  const navigator = useNavigate();
  let data =UseCart();

  const handlelogout = () => {
    localStorage.removeItem("authToken");
    navigator("/login");
  };
  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark bg-success">
        <div className="container-fluid">
          <Link className="navbar-brand fs-1 fst-italic " to="/">
            Chha Food
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link
                  className="nav-link active fs-5 "
                  aria-current="page"
                  to="/"
                >
                  Home
                </Link>
              </li>
              {localStorage.getItem("authToken") ? (
                <li className="nav-item">
                  <Link
                    className="nav-link active fs-5"
                    aria-current="page"
                    to="/Myorder"
                  >
                    My Oders
                  </Link>
                </li>
              ) : (
                " "
              )}
            </ul>
            {!localStorage.getItem("authToken") ? (
              <div className="d-flex">
                <Link className="btn bg-white text-success mx-1" to="/login">
                  login
                </Link>
                <Link className="btn bg-white text-success mx-1" to="/SingUp">
                  SingUp
                </Link>
              </div>
            ) : (
              <div className="d-flex">
                <div
                  className="btn bg-white text-success mx-2"
                  onClick={() => {setcartView(true)}}
                >
                  MyCart
                  <Badge pill bg="danger">
                    {data.length}
                  </Badge>
                </div>
                {cartView? <Models onClose={() => {setcartView(false)}}><Cart/></Models>:null}
                <div
                  className="btn bg-white text-danger mx-1"
                  onClick={handlelogout}
                >
                  logout
                </div>
              </div>
            )}
          </div>
        </div>
      </nav>
    </>
  );
}
