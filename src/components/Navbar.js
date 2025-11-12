import React, { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import Badge from "@mui/material/Badge";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { useCart } from "./ContextReducer";
import Modal from "../Modal";
import Cart from "../screens/Cart";

export default function Navbar() {
  const [cartView, setCartView] = useState(false);
  const navigate = useNavigate();
  const items = useCart();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const loadCart = () => {
    setCartView(true);
  };

  return (
    <div>
      <nav
        className="navbar navbar-expand-lg navbar-dark position-sticky"
        style={{
          background: "linear-gradient(90deg, #0D1B2A 0%, #1E3A8A 100%)",
          boxShadow: "0 4px 8px rgba(0,0,0,0.15)",
          top: 0,
          zIndex: 1020,
        }}
      >
        <div className="container-fluid">
          <Link
            className="navbar-brand fs-2"
            to="/"
            style={{
              fontFamily: "'Pacifico', cursive",
              background: "linear-gradient(90deg, #FFD166 0%, #FF4B2B 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              textShadow: "1px 1px 2px rgba(0,0,0,0.3)",
              letterSpacing: "1px",
            }}
          >
            Bite & Go
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
                <NavLink
                  className={({ isActive }) =>
                    `nav-link fs-5 mx-3 ${isActive ? "active" : ""}`
                  }
                  aria-current="page"
                  to="/"
                >
                  Home
                </NavLink>
              </li>

              {localStorage.getItem("token") && (
                <li className="nav-item">
                  <NavLink
                    className={({ isActive }) =>
                      `nav-link fs-5 mx-3 ${isActive ? "active" : ""}`
                    }
                    aria-current="page"
                    to="/myorder"
                  >
                    My Orders
                  </NavLink>
                </li>
              )}
            </ul>

            <div className="d-flex align-items-center">
              {!localStorage.getItem("token") ? (
                <div className="d-flex">
                  <Link className="btn bg-white text-danger mx-1" to="/login">
                    Login
                  </Link>
                  <Link className="btn bg-white text-danger mx-1" to="/signup">
                    Signup
                  </Link>
                </div>
              ) : (
                <div className="d-flex align-items-center">
                  <button
                    className="btn bg-white text-danger mx-2 d-flex align-items-center"
                    onClick={loadCart}
                  >
                    <Badge
                      color="error"
                      badgeContent={items.length}
                      className="me-1"
                    >
                      <ShoppingCartIcon />
                    </Badge>
                    <span className="ms-1">Cart</span>
                  </button>

                  {cartView && (
                    <Modal
                      onClose={() => setCartView(false)}
                      onCheckout={() => {
                        // Trigger checkout from Cart
                        const checkoutButton =
                          document.querySelector("#cart-checkout-btn");
                        if (checkoutButton) checkoutButton.click(); // simulate click inside Cart
                      }}
                    >
                      <Cart />
                    </Modal>
                  )}

                  <button
                    onClick={handleLogout}
                    className="btn btn-outline-light mx-2"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
}
