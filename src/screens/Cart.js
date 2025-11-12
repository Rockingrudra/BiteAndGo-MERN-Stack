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

    // Order object structure that matches backend expectations
    const orderData = {
      email: userEmail,
      order_data: [
        data, // your cart items
        { Order_date: new Date().toDateString() },
      ],
    };

    try {
      const response = await fetch("http://localhost:5000/api/auth/orderData", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(orderData),
      });

      if (response.ok) {
        const json = await response.json();
        console.log("Order Response:", json);
        alert("✅ Order Placed Successfully!");
        dispatch({ type: "DROP" }); // clear cart
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
      {data.map((food, index) => (
        <div
          key={index}
          className="d-flex justify-content-between align-items-center my-3 p-3"
          style={{
            backgroundColor: "#fdfdfd",
            borderRadius: "14px",
            boxShadow: "0 4px 10px rgba(0,0,0,0.08)",
          }}
        >
          <div className="d-flex align-items-center">
            <img
              src={food.img}
              alt={food.name}
              style={{
                height: "60px",
                width: "60px",
                borderRadius: "10px",
                objectFit: "cover",
                marginRight: "10px",
              }}
            />
            <div>
              <h6 className="fw-bold mb-1" style={{ color: "#222" }}>
                {food.name}
              </h6>
              <small style={{ color: "#555", fontWeight: "500" }}>
                Qty: {food.qty} | Size: {food.size}
              </small>
            </div>
          </div>

          <div className="text-end">
            <p
              className="fw-semibold mb-1"
              style={{ color: "#FF4B2B", fontSize: "1rem" }}
            >
              ₹{food.price}
            </p>
            <button
              className="btn btn-sm"
              style={{
                color: "#FF4B2B",
                backgroundColor: "transparent",
                border: "1px solid #FF4B2B",
                borderRadius: "8px",
                fontWeight: "600",
                padding: "3px 10px",
              }}
              onClick={() => handleRemove(index)}
            >
              Remove
            </button>
          </div>
        </div>
      ))}

      <hr />

      <div className="d-flex justify-content-between align-items-center mt-3">
        <h5 className="fw-bold text-dark">Total</h5>
        <h5 className="fw-bold" style={{ color: "#FF4B2B" }}>
          ₹{totalPrice}/-
        </h5>
      </div>

      <div className="text-center mt-4">
        <button
          className="btn w-100 fw-semibold"
          style={{
            background: "linear-gradient(90deg, #FF4B2B 0%, #FF914D 100%)",
            color: "#fff",
            borderRadius: "12px",
            padding: "10px 0",
            fontSize: "1rem",
            border: "none",
          }}
          onClick={handleCheckout}
        >
          Place Order 🚀
        </button>
      </div>
    </div>
  );
}
