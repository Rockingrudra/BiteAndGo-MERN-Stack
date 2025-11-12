import React, { useEffect, useState } from "react";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

export default function MyOrder() {
  const [orderData, setOrderData] = useState([]);

  const fetchMyOrder = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/auth/myOrderData", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: localStorage.getItem("userEmail") }),
      });

      const data = await response.json();
      console.log("📦 My Orders Response:", data);

      if (data.orderData && Array.isArray(data.orderData.order_data)) {
        setOrderData(data.orderData.order_data);
      } else {
        setOrderData([]);
      }
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

  useEffect(() => {
    fetchMyOrder();
  }, []);

  return (
    <div>
      <Navbar />

      <div
        className="container my-5"
        style={{
          minHeight: "80vh",
          color: "#fff",
        }}
      >
        <h2
          className="text-center mb-5 gradient-text"
          style={{
            fontWeight: "700",
            fontSize: "2rem",
          }}
        >
          My Orders 🛒
        </h2>

        {orderData.length > 0 ? (
          orderData
            .slice(0)
            .reverse()
            .map((orderArray, orderIndex) => {
              // ✅ Ensure each orderArray is valid
              if (!Array.isArray(orderArray)) {
                console.warn("⚠️ Invalid order data:", orderArray);
                return null;
              }

              const orderDateObj = orderArray.find(
                (x) => x && typeof x === "object" && x.Order_date
              );
              const orderDate = orderDateObj ? orderDateObj.Order_date : "Unknown";

              return (
                <div key={orderIndex} className="mb-5">
                  {/* Order Date */}
                  <div
                    className="text-center fw-bold py-2"
                    style={{
                      background: "rgba(255, 255, 255, 0.08)",
                      borderRadius: "10px",
                      width: "fit-content",
                      margin: "0 auto 20px auto",
                      padding: "8px 18px",
                      color: "#FF914D",
                      fontSize: "1rem",
                      letterSpacing: "0.5px",
                      boxShadow: "0 0 10px rgba(255,145,77,0.3)",
                    }}
                  >
                    Order Date: <span style={{ color: "#fff" }}>{orderDate}</span>
                  </div>

                  {/* Order Items */}
                  <div className="row justify-content-center">
                    {orderArray
                      .filter((item) => item && !item.Order_date)
                      .map((item, index) => (
                        <div
                          className="col-12 col-md-6 col-lg-3 d-flex justify-content-center"
                          key={index}
                        >
                          <div
                            className="card border-0 shadow-lg mb-4"
                            style={{
                              width: "16rem",
                              borderRadius: "18px",
                              backgroundColor: "#1c1c1c",
                              color: "#f5f5f5",
                              position: "relative",
                              transition:
                                "transform 0.3s ease, box-shadow 0.3s ease",
                              overflow: "hidden",
                            }}
                            onMouseEnter={(e) => {
                              e.currentTarget.style.transform = "translateY(-6px)";
                              e.currentTarget.style.boxShadow =
                                "0 10px 25px rgba(255, 145, 77, 0.3)";
                            }}
                            onMouseLeave={(e) => {
                              e.currentTarget.style.transform = "translateY(0)";
                              e.currentTarget.style.boxShadow =
                                "0 4px 8px rgba(0,0,0,0.15)";
                            }}
                          >
                            <img
                              src={item.img}
                              alt={item.name}
                              className="card-img-top"
                              style={{
                                height: "140px",
                                objectFit: "cover",
                                borderTopLeftRadius: "18px",
                                borderTopRightRadius: "18px",
                              }}
                            />
                            <div className="card-body text-center">
                              <h5
                                className="fw-semibold"
                                style={{
                                  color: "#fff",
                                  fontSize: "1.1rem",
                                  marginBottom: "10px",
                                }}
                              >
                                {item.name}
                              </h5>
                              <div
                                className="d-flex justify-content-center align-items-center"
                                style={{ gap: "10px", marginBottom: "10px" }}
                              >
                                <span
                                  className="badge"
                                  style={{
                                    backgroundColor: "#2B2B2B",
                                    color: "#FF914D",
                                    fontWeight: "500",
                                  }}
                                >
                                  Qty: {item.qty}
                                </span>
                                <span
                                  className="badge"
                                  style={{
                                    backgroundColor: "#2B2B2B",
                                    color: "#FF914D",
                                    fontWeight: "500",
                                  }}
                                >
                                  Size: {item.size}
                                </span>
                              </div>
                              <div
                                className="fw-bold"
                                style={{
                                  color: "#FF914D",
                                  fontSize: "1.1rem",
                                }}
                              >
                                ₹{item.price}/-
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
              );
            })
        ) : (
          <div
            className="text-center mt-5"
            style={{
              color: "#aaa",
              fontSize: "1.2rem",
              letterSpacing: "0.5px",
            }}
          >
            You haven’t placed any orders yet 😔
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}
