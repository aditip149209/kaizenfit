import React, { useState } from "react";

export default function ChangePasswordModal({ onClose }) {
  // Optional: You can manage form state here if needed
  const [form, setForm] = useState({
    current: "",
    new: "",
    confirm: "",
  });

  // For hover effect on Save button
  const [saveHover, setSaveHover] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add your submit logic here
    alert("Password change submitted!");
  };

  return (
    <div
      style={{
        background: "#222",
        minHeight: "100vh",
        margin: 0,
        fontFamily: "'Segoe UI', Arial, sans-serif",
        display: "flex",
        alignItems: "flex-start",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          background: "#07302c",
          color: "#d6f5f0",
          width: 340,
          margin: "60px auto",
          borderRadius: 10,
          boxShadow: "0 4px 24px rgba(0,0,0,0.3)",
          padding: "28px 26px 20px 26px",
          position: "relative",
        }}
      >
        <span
          style={{
            position: "absolute",
            top: 16,
            right: 18,
            fontSize: "1.2rem",
            color: "#d6f5f0",
            cursor: "pointer",
            userSelect: "none",
          }}
          onClick={onClose || (() => alert("Close clicked!"))}
          title="Close"
        >
          &times;
        </span>
        <h2
          style={{
            marginTop: 0,
            fontSize: "1.1rem",
            fontWeight: 500,
            letterSpacing: "1px",
            textAlign: "center",
            marginBottom: 28,
          }}
        >
          CHANGE PASSWORD
        </h2>
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: 16 }}>
            <label
              htmlFor="current"
              style={{
                display: "block",
                marginBottom: 4,
                color: "#b2ccc7",
                fontSize: "0.97rem",
              }}
            >
              Current Password:
            </label>
            <input
              type="password"
              id="current"
              name="current"
              value={form.current}
              onChange={handleChange}
              style={{
                width: "100%",
                padding: "7px 10px",
                borderRadius: 7,
                border: "1px solid #17544c",
                background: "transparent",
                color: "#fff",
                fontSize: "1rem",
                boxSizing: "border-box",
                outline: "none",
                marginBottom: 2,
              }}
              autoComplete="current-password"
            />
          </div>
          <div style={{ marginBottom: 16 }}>
            <label
              htmlFor="new"
              style={{
                display: "block",
                marginBottom: 4,
                color: "#b2ccc7",
                fontSize: "0.97rem",
              }}
            >
              New Password:
            </label>
            <input
              type="password"
              id="new"
              name="new"
              value={form.new}
              onChange={handleChange}
              style={{
                width: "100%",
                padding: "7px 10px",
                borderRadius: 7,
                border: "1px solid #17544c",
                background: "transparent",
                color: "#fff",
                fontSize: "1rem",
                boxSizing: "border-box",
                outline: "none",
                marginBottom: 2,
              }}
              autoComplete="new-password"
            />
          </div>
          <div style={{ marginBottom: 16 }}>
            <label
              htmlFor="confirm"
              style={{
                display: "block",
                marginBottom: 4,
                color: "#b2ccc7",
                fontSize: "0.97rem",
              }}
            >
              Confirm Password:
            </label>
            <input
              type="password"
              id="confirm"
              name="confirm"
              value={form.confirm}
              onChange={handleChange}
              style={{
                width: "100%",
                padding: "7px 10px",
                borderRadius: 7,
                border: "1px solid #17544c",
                background: "transparent",
                color: "#fff",
                fontSize: "1rem",
                boxSizing: "border-box",
                outline: "none",
                marginBottom: 2,
              }}
              autoComplete="new-password"
            />
          </div>
          <button
            type="submit"
            style={{
              display: "block",
              margin: "18px auto 0 auto",
              background: saveHover ? "#176e65" : "#219488",
              color: "#fff",
              border: "none",
              borderRadius: 18,
              padding: "7px 28px",
              fontSize: "1rem",
              fontWeight: 500,
              cursor: "pointer",
              transition: "background 0.2s",
            }}
            onMouseEnter={() => setSaveHover(true)}
            onMouseLeave={() => setSaveHover(false)}
          >
            Save
          </button>
        </form>
      </div>
    </div>
  );
}
