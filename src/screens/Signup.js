import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Navbar from "../components/Navbar";

export default function Signup() {
  const [credentials, setCredentials] = useState({
    name: "",
    email: "",
    password: "",
    location: "",
  });
  const [address, setAddress] = useState("");
  const navigate = useNavigate();

  const handleClick = async (e) => {
    e.preventDefault();
    try {
      const navLocation = () =>
        new Promise((res, rej) => {
          navigator.geolocation.getCurrentPosition(res, rej);
        });

      const { coords } = await navLocation();
      const lat = coords.latitude;
      const long = coords.longitude;

      const response = await fetch("http://localhost:5000/api/auth/getlocation", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ latlong: { lat, long } }),
      });

      const { location } = await response.json();
      setAddress(location);
      setCredentials((prev) => ({ ...prev, location }));
    } catch (err) {
      alert("Could not get location. Please type your city manually.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:5000/api/auth/createuser", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(credentials),
    });

    const json = await response.json();
    if (json.success) {
      localStorage.setItem("token", json.authToken);
      alert("Signup successful! Redirecting...");
      navigate("/login");
    } else {
      alert(json.error || "Enter Valid Credentials");
    }
  };

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  return (
    <div
      style={{
        backgroundImage:
          'url("https://images.pexels.com/photos/1565982/pexels-photo-1565982.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&dpr=1")',
        minHeight: "100vh",
        backgroundSize: "cover",
        backgroundPosition: "center",
        position: "relative",
      }}
    >
      <Navbar />

      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          background: "linear-gradient(rgba(0,0,0,0.55), rgba(0,0,0,0.45))",
          backdropFilter: "blur(3px)",
          zIndex: 1,
        }}
      ></div>

      <div
        className="d-flex justify-content-center align-items-center"
        style={{ minHeight: "100vh", position: "relative", zIndex: 2 }}
      >
        <form
          onSubmit={handleSubmit}
          className="p-5 shadow-lg border-0"
          style={{
            width: "420px",
            borderRadius: "20px",
            background: "rgba(255, 255, 255, 0.12)",
            backdropFilter: "blur(8px)",
            color: "#fff",
          }}
        >
          <h2
            className="text-center mb-4 fw-bold"
            style={{
              background: "linear-gradient(90deg, #FF4B2B 0%, #FF914D 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Create Account 🍽️
          </h2>

          {/* Name */}
          <div className="mb-3">
            <label htmlFor="name" className="form-label fw-semibold text-light">
              Name
            </label>
            <input
              type="text"
              name="name"
              value={credentials.name}
              onChange={onChange}
              placeholder="Enter your full name"
              className="form-control"
              required
              style={{
                borderRadius: "10px",
                border: "1px solid #FF914D",
                backgroundColor: "rgba(255,255,255,0.15)",
                color: "#fff",
                '::placeholder': { color: 'rgba(255,255,255,0.6)' },
              }}
            />
          </div>

          {/* Email */}
          <div className="mb-3">
            <label htmlFor="email" className="form-label fw-semibold text-light">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={credentials.email}
              onChange={onChange}
              placeholder="Enter your email"
              className="form-control"
              required
              style={{
                borderRadius: "10px",
                border: "1px solid #FF914D",
                backgroundColor: "rgba(255,255,255,0.15)",
                color: "#fff",
              }}
            />
          </div>

          {/* Location */}
          <div className="mb-3">
            <label htmlFor="location" className="form-label fw-semibold text-light">
              Address / Location
            </label>
            <input
              type="text"
              name="location"
              placeholder="Enter your city or click the button below"
              value={credentials.location || address}
              onChange={onChange}
              className="form-control"
              style={{
                borderRadius: "10px",
                border: "1px solid #FF914D",
                backgroundColor: "rgba(255,255,255,0.15)",
                color: "#fff",
              }}
            />
            <button
              type="button"
              onClick={handleClick}
              className="btn w-100 mt-3 fw-semibold"
              style={{
                background: "linear-gradient(90deg, #FF4B2B 0%, #FF914D 100%)",
                color: "#fff",
                borderRadius: "10px",
                border: "none",
              }}
            >
              📍 Use Current Location
            </button>
          </div>

          {/* Password */}
          <div className="mb-4">
            <label htmlFor="password" className="form-label fw-semibold text-light">
              Password
            </label>
            <input
              type="password"
              name="password"
              value={credentials.password}
              onChange={onChange}
              placeholder="Create a strong password"
              minLength={5}
              className="form-control"
              required
              style={{
                borderRadius: "10px",
                border: "1px solid #FF914D",
                backgroundColor: "rgba(255,255,255,0.15)",
                color: "#fff",
              }}
            />
          </div>

          {/* Buttons */}
          <button
            type="submit"
            className="btn w-100 fw-semibold mb-3"
            style={{
              background: "linear-gradient(90deg, #FF4B2B 0%, #FF914D 100%)",
              color: "#fff",
              borderRadius: "12px",
              padding: "10px 0",
              border: "none",
            }}
          >
            Sign Up
          </button>

          <div className="text-center">
            <p className="text-light">
              Already have an account?{" "}
              <Link to="/login" className="fw-semibold" style={{ color: "#FF914D" }}>
                Login here
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}
