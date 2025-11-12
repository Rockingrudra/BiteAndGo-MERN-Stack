import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import { useNavigate, Link } from 'react-router-dom';

export default function Login() {
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch("http://localhost:5000/api/auth/login", {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(credentials)
    });

    const json = await response.json();
    if (json.success) {
      localStorage.setItem('userEmail', credentials.email);
      localStorage.setItem('token', json.authToken);
      navigate("/");
    } else {
      alert("Enter valid credentials!");
    }
  };

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  return (
    <div
      style={{
        backgroundImage:
          'url("https://images.pexels.com/photos/326278/pexels-photo-326278.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&dpr=1")',
        minHeight: '100vh',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        position: 'relative',
      }}
    >
      <Navbar />

      {/* Overlay */}
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
            width: "380px",
            borderRadius: "20px",
            background: "rgba(255, 255, 255, 0.12)",
            backdropFilter: "blur(8px)",
            color: "#fff",
            boxShadow: "0 8px 32px rgba(0, 0, 0, 0.3)",
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
            Welcome Back 👋
          </h2>

          {/* Email */}
          <div className="mb-3">
            <label htmlFor="email" className="form-label fw-semibold text-light">
              Email Address
            </label>
            <input
              type="email"
              className="form-control"
              id="email"
              name="email"
              value={credentials.email}
              onChange={onChange}
              placeholder="Enter your email"
              required
              style={{
                borderRadius: "10px",
                border: "1px solid #FF914D",
                backgroundColor: "rgba(255,255,255,0.15)",
                color: "#fff",
                '::placeholder': { color: 'rgba(255,255,255,0.6)' }
              }}
            />
          </div>

          {/* Password */}
          <div className="mb-4">
            <label htmlFor="password" className="form-label fw-semibold text-light">
              Password
            </label>
            <input
              type="password"
              className="form-control"
              id="password"
              name="password"
              value={credentials.password}
              onChange={onChange}
              placeholder="Enter your password"
              required
              style={{
                borderRadius: "10px",
                border: "1px solid #FF914D",
                backgroundColor: "rgba(255,255,255,0.15)",
                color: "#fff",
                '::placeholder': { color: 'rgba(255,255,255,0.6)' }
              }}
            />
          </div>

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
            Login
          </button>

          <div className="text-center">
            <p className="text-light">
              New here?{" "}
              <Link
                to="/signup"
                className="fw-semibold"
                style={{ color: "#FF914D", textDecoration: "none" }}
              >
                Create an account
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}
