import React from "react";

export default function Modal({ children, onClose, onCheckout }) {
  const handleClose = onClose || (() => alert("Close clicked"));
  const handleCheckout = onCheckout || (() => alert("Proceeding to Checkout"));

  return (
    <div
      className="modal fade show"
      role="dialog"
      aria-modal="true"
      style={{
        display: "block",
        backgroundColor: "rgba(0, 0, 0, 0.6)",
        backdropFilter: "blur(6px)",
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        zIndex: 1050,
        overflowY: "auto",
      }}
    >
      <div
        className="modal-dialog modal-dialog-centered"
        style={{ maxWidth: "750px", width: "90%", margin: "auto" }}
      >
        <div
          className="modal-content border-0"
          style={{
            borderRadius: "20px",
            overflow: "hidden",
            boxShadow: "0 10px 30px rgba(0,0,0,0.25)",
            backgroundColor: "#fff",
          }}
        >
          {/* Header */}
          <div
            className="modal-header"
            style={{
              background: "linear-gradient(90deg, #FF4B2B 0%, #FF914D 100%)",
              color: "#fff",
              borderBottom: "none",
              padding: "1rem 1.5rem",
            }}
          >
            <h5 className="modal-title fw-bold fs-4">Your Cart</h5>
            <button
              type="button"
              className="btn-close btn-close-white"
              onClick={handleClose}
              aria-label="Close"
            ></button>
          </div>

          {/* Body */}
          <div
            className="modal-body"
            style={{ maxHeight: "75vh", overflowY: "auto", padding: "1.5rem" }}
          >
            {children}
          </div>

          {/* Footer */}
          <div
            className="modal-footer border-0"
            style={{
              backgroundColor: "#f9f9f9",
              display: "flex",
              justifyContent: "space-between",
              padding: "1rem 1.5rem",
            }}
          >
            <button
              className="btn"
              onClick={handleClose}
              style={{
                backgroundColor: "#e0e0e0",
                color: "#333",
                borderRadius: "12px",
                fontWeight: "600",
                padding: "0.5rem 1rem",
              }}
            >
              Close
            </button>
            <button
              className="btn text-white"
              onClick={handleCheckout}
              style={{
                background: "linear-gradient(90deg, #FF4B2B 0%, #FF914D 100%)",
                border: "none",
                borderRadius: "12px",
                fontWeight: "600",
                padding: "0.5rem 1.5rem",
              }}
            >
              Proceed to Checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
