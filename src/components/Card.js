import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatchCart, useCart } from './ContextReducer';

export default function Card(props) {
  const data = useCart();
  const dispatch = useDispatchCart();
  const navigate = useNavigate();

  const [qty, setQty] = useState(1);
  const [size, setSize] = useState("");
  const priceRef = useRef();

  const options = props.options;
  const priceOptions = Object.keys(options);
  const foodItem = props.item;
  const finalPrice = qty * parseInt(options[size]);

  const handleClick = () => {
    if (!localStorage.getItem("token")) navigate("/login");
  };

  const handleQty = (e) => setQty(e.target.value);
  const handleOptions = (e) => setSize(e.target.value);

  const handleAddToCart = async () => {
    if (!localStorage.getItem("token")) {
      navigate("/login");
      return;
    }

    const existingItem = data.find(
      (item) => item.id === foodItem._id && item.size === size
    );

    if (existingItem) {
      await dispatch({
        type: "UPDATE",
        id: foodItem._id,
        price: finalPrice,
        qty: qty,
        size: size,
      });
    } else {
      await dispatch({
        type: "ADD",
        id: foodItem._id,
        name: foodItem.name,
        price: finalPrice,
        qty: qty,
        size: size,
        img: props.ImgSrc,
      });
    }
  };

  useEffect(() => {
    setSize(priceRef.current.value);
  }, []);

  return (
    <div
      className="card-container"
      style={{
        position: "relative",
        borderRadius: "18px",
        transition: "all 0.4s ease",
      }}
    >
      {/* Glowing Backlight */}
      <div
        className="hover-glow"
        style={{
          content: '""',
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          borderRadius: "20px",
          background: "radial-gradient(circle at center, rgba(255,145,77,0.25), rgba(255,75,43,0.05))",
          opacity: 0,
          transition: "opacity 0.4s ease, transform 0.4s ease",
          zIndex: 0,
          filter: "blur(10px)",
        }}
      ></div>

      {/* Main Card */}
      <div
        className="card mt-3 border-0 shadow-lg"
        style={{
          width: "18rem",
          borderRadius: "18px",
          backgroundColor: "#1c1c1c",
          color: "#f5f5f5",
          position: "relative",
          zIndex: 1,
          transition: "transform 0.3s ease, box-shadow 0.3s ease",
        }}
        onMouseEnter={(e) => {
          const parent = e.currentTarget.parentElement;
          const glow = parent.querySelector(".hover-glow");
          glow.style.opacity = "1";
          glow.style.transform = "scale(1.05)";
          e.currentTarget.style.transform = "translateY(-5px)";
          e.currentTarget.style.boxShadow = "0 10px 25px rgba(255, 145, 77, 0.3)";
        }}
        onMouseLeave={(e) => {
          const parent = e.currentTarget.parentElement;
          const glow = parent.querySelector(".hover-glow");
          glow.style.opacity = "0";
          glow.style.transform = "scale(1)";
          e.currentTarget.style.transform = "translateY(0)";
          e.currentTarget.style.boxShadow = "0 4px 8px rgba(0,0,0,0.15)";
        }}
      >
        <img
          src={props.ImgSrc}
          className="card-img-top"
          alt={props.foodName}
          style={{
            height: "150px",
            objectFit: "cover",
            borderTopLeftRadius: "18px",
            borderTopRightRadius: "18px",
          }}
        />

        <div className="card-body text-center">
          <h5
            className="fw-semibold mb-3"
            style={{
              color: "#fff",
              fontSize: "1.2rem",
              letterSpacing: "0.5px",
            }}
          >
            {props.foodName}
          </h5>

          <div
            className="container w-100 p-0"
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              gap: "5px",
            }}
          >
            {/* Quantity Selector */}
            <select
              className="rounded"
              style={{
                backgroundColor: "#2B2B2B",
                color: "#f5f5f5",
                border: "1px solid #555",
                fontWeight: "500",
                fontSize: "0.9rem",
                padding: "5px 8px",
              }}
              onClick={handleClick}
              onChange={handleQty}
              value={qty}
            >
              {Array.from(Array(6), (_, i) => (
                <option key={i + 1} value={i + 1}>
                  {i + 1}
                </option>
              ))}
            </select>

            {/* Size Selector */}
            <select
              ref={priceRef}
              className="rounded"
              style={{
                backgroundColor: "#2B2B2B",
                color: "#f5f5f5",
                border: "1px solid #555",
                fontWeight: "500",
                fontSize: "0.9rem",
                padding: "5px 8px",
              }}
              onClick={handleClick}
              onChange={handleOptions}
              value={size}
            >
              {priceOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>

            <div
              className="ms-2 fs-5 fw-bold"
              style={{
                color: "#FF914D",
                minWidth: "70px",
                textAlign: "right",
              }}
            >
              ₹{finalPrice}/-
            </div>
          </div>

          <hr style={{ borderColor: "#333" }} />

          <button
            className="btn w-100 text-white fw-semibold mt-2"
            style={{
              background: "linear-gradient(90deg, #FF4B2B 0%, #FF914D 100%)",
              border: "none",
              borderRadius: "12px",
              padding: "8px 0",
              fontSize: "1rem",
              transition: "transform 0.2s ease",
            }}
            onClick={handleAddToCart}
            onMouseEnter={(e) =>
              (e.currentTarget.style.transform = "scale(1.03)")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.transform = "scale(1)")
            }
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}
