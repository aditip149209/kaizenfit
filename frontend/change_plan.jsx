import React, { useState } from "react";

export default function ChangePlanModal({ currentPlan = "Gold", onClose }) {
  const [selectedPlan, setSelectedPlan] = useState("Platinum");
  const [password, setPassword] = useState("");
  const [confirmHover, setConfirmHover] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add your confirm logic here
    alert(`Plan changed to ${selectedPlan}!`);
  };

  return (
    <div
      style={{
        background: "#1a2b2b",
        margin: 0,
        minHeight: "100vh",
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "'Segoe UI', Arial, sans-serif",
      }}
    >
      <div
        style={{
          background: "#0d2323",
          borderRadius: 14,
          width: 350,
          padding: "28px 24px 24px 24px",
          boxShadow: "0 4px 24px rgba(0,0,0,0.25)",
          color: "#fff",
          position: "relative",
        }}
      >
        <button
          title="Close"
          style={{
            position: "absolute",
            right: 18,
            top: 18,
            fontSize: "1.2rem",
            color: "#b0b0b0",
            background: "none",
            border: "none",
            cursor: "pointer",
            lineHeight: 1,
          }}
          onClick={onClose || (() => alert("Close clicked!"))}
        >
          &times;
        </button>
        <h2
          style={{
            margin: "0 0 20px 0",
            fontSize: "1.2rem",
            fontWeight: 600,
            textAlign: "center",
            letterSpacing: "1px",
          }}
        >
          CHANGE PLAN
        </h2>
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: 18 }}>
            <label
              className="label"
              style={{
                display: "block",
                fontSize: "0.97rem",
                marginBottom: 7,
                color: "#b0c4c4",
              }}
            >
              Current Plan:
            </label>
            <div
              style={{
                background: "#bfa14a",
                color: "#fff",
                border: "none",
                borderRadius: 8,
                padding: "8px 0",
                width: "100%",
                fontSize: "1rem",
                fontWeight: 600,
                marginBottom: 4,
                textAlign: "center",
                pointerEvents: "none",
              }}
            >
              {currentPlan}
            </div>
          </div>
          <div style={{ marginBottom: 18 }}>
            <label
              className="label"
              style={{
                display: "block",
                fontSize: "0.97rem",
                marginBottom: 7,
                color: "#b0c4c4",
              }}
            >
              Choose New Plan:
            </label>
            <select
              value={selectedPlan}
              onChange={(e) => setSelectedPlan(e.target.value)}
              style={{
                width: "100%",
                padding: "9px 10px",
                borderRadius: 8,
                border: "none",
                background: "#223939",
                color: "#fff",
                fontSize: "1rem",
                marginBottom: 4,
                outline: "none",
                appearance: "none",
              }}
            >
              <option>Platinum</option>
              <option>Gold</option>
              <option>Silver</option>
            </select>
          </div>
          <div style={{ marginBottom: 18 }}>
            <label
              className="label"
              style={{
                display: "block",
                fontSize: "0.97rem",
                marginBottom: 7,
                color: "#b0c4c4",
              }}
            >
              Enter Password:
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{
                width: "100%",
                padding: "9px 10px",
                borderRadius: 8,
                border: "none",
                background: "#223939",
                color: "#fff",
                fontSize: "1rem",
                marginBottom: 4,
                outline: "none",
              }}
            />
          </div>
          <button
            type="submit"
            style={{
              width: 100,
              display: "block",
              margin: "18px auto 0 auto",
              padding: "8px 0",
              background: confirmHover ? "#1fa0a0" : "#2acfcf",
              color: "#fff",
              border: "none",
              borderRadius: 8,
              fontSize: "1rem",
              fontWeight: 600,
              cursor: "pointer",
              transition: "background 0.2s",
            }}
            onMouseEnter={() => setConfirmHover(true)}
            onMouseLeave={() => setConfirmHover(false)}
          >
            Confirm
          </button>
        </form>
      </div>
    </div>
  );
}
