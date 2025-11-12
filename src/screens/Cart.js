import React from "react";
import { useCart, useDispatchCart } from "../components/ContextReducer";

export default function Cart() {
  const data = useCart();
  const dispatch = useDispatchCart();

  if (data.length === 0) {
    return (
      <div className="text-center py-5">
        <h5 className="fw-semibold text-muted">Your cart is empty 🛒</h5>
      </div>
    );
  }

  const totalPrice = data.reduce((total, food) => total + food.price, 0);

  const handleCheckout = async () => {
    const userEmail = localStorage.getItem("userEmail");
    const orderData = {
      email: userEmail,
      order_data: [data, { Order_date: new Date().toDateString() }],
    };

    try {
      const response = await fetch("http://localhost:5000/api/auth/orderData", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(orderData),
      });

      if (response.ok) {
        await response.json();
        alert("✅ Order Placed Successfully!");
        dispatch({ type: "DROP" });
      } else {
        alert("❌ Failed to place order. Please try again.");
      }
    } catch (err) {
      console.error("Checkout Error:", err);
      alert("⚠️ Server error while placing order.");
    }
  };

  const handleRemove = (index) => {
    dispatch({ type: "REMOVE", index });
  };

  return (
    <div>
      {/* Cart Items */}
      {data.map((food, index) => (
        <div
          key={index}
          className="d-flex justify-content-between align-items-center mb-3 p-3"
          style={{
            backgroundColor: "#fff",
            borderRadius: "14px",
            boxShadow: "0 3px 8px rgba(0,0,0,0.08)",
          }}
        >
          {/* Left section (image + details) */}
          <div className="d-flex align-items-center">
            <img
              src={food.img}
              alt={food.name}
              style={{
                height: "65px",
                width: "65px",
                borderRadius: "10px",
                objectFit: "cover",
                marginRight: "15px",
              }}
            />
            <div>
              <h6
                className="fw-bold mb-1"
                style={{ color: "#222", fontSize: "1rem" }}
              >
                {food.name}
              </h6>
              <small
                style={{
                  color: "#666",
                  fontWeight: "500",
                  fontSize: "0.85rem",
                }}
              >
                Qty: {food.qty} | Size: {food.size}
              </small>
            </div>
          </div>

          {/* Right section (price + remove) */}
          <div className="text-end">
            <p
              className="fw-semibold mb-1"
              style={{
                color: "#FF4B2B",
                fontSize: "1rem",
                marginBottom: "4px",
              }}
            >
              ₹{food.price}
            </p>
            <button
              onClick={() => handleRemove(index)}
              className="btn btn-link p-0"
              style={{
                color: "#FF4B2B",
                fontWeight: "600",
                fontSize: "0.9rem",
                textDecoration: "none",
              }}
            >
              Remove
            </button>
          </div>
        </div>
      ))}

      <hr className="my-4" />

      {/* Total Row */}
      <div className="d-flex justify-content-between align-items-center mt-3">
        <h5 className="fw-bold text-dark mb-0">Total</h5>
        <h5
          className="fw-bold mb-0"
          style={{ color: "#FF4B2B", fontSize: "1.2rem" }}
        >
          ₹{totalPrice}/-
        </h5>
      </div>

      {/* Hidden button for Modal’s Proceed */}
      <div className="text-center mt-4">
        <button
          id="cart-checkout-btn"
          className="btn btn-danger d-none"
          onClick={handleCheckout}
        >
          Hidden Checkout Trigger
        </button>
      </div>
    </div>
  );
}
