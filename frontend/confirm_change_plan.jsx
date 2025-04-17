import React, { useState } from "react";

export default function ConfirmChangePlanModal({
  onYes = () => alert("Yes clicked!"),
  onNo = () => alert("No clicked!"),
}) {
  const [hovered, setHovered] = useState(null);

  return (
    <div
      style={{
        background: "#222",
        minHeight: "100vh",
        margin: 0,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "'Segoe UI', Arial, sans-serif",
      }}
    >
      <div
        style={{
          background: "#073333",
          borderRadius: 14,
          width: 340,
          padding: "32px 24px 24px 24px",
          boxShadow: "0 4px 24px rgba(0,0,0,0.25)",
          color: "#fff",
          textAlign: "center",
          position: "relative",
        }}
      >
        <h2
          style={{
            margin: "0 0 16px 0",
            fontSize: "1.15rem",
            fontWeight: 600,
            letterSpacing: "1px",
          }}
        >
          CONFIRM CHANGE PLAN
        </h2>
        <hr
          style={{
            border: "none",
            borderTop: "1px solid #295959",
            margin: "16px 0 22px 0",
          }}
        />
        <div
          style={{
            color: "#b0c4c4",
            marginBottom: 18,
            fontSize: "1rem",
          }}
        >
          Do you really want to change your plan?
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: 24,
            marginTop: 10,
          }}
        >
          <button
            style={{
              minWidth: 100,
              padding: "9px 0",
              borderRadius: 20,
              border: "none",
              background: hovered === "yes" ? "#1fa0a0" : "#2acfcf",
              color: "#fff",
              fontSize: "1rem",
              fontWeight: 500,
              cursor: "pointer",
              transition: "background 0.2s",
            }}
            onMouseEnter={() => setHovered("yes")}
            onMouseLeave={() => setHovered(null)}
            onClick={onYes}
          >
            Yes
          </button>
          <button
            style={{
              minWidth: 100,
              padding: "9px 0",
              borderRadius: 20,
              border: "none",
              background: hovered === "no" ? "#1fa0a0" : "#2acfcf",
              color: "#fff",
              fontSize: "1rem",
              fontWeight: 500,
              cursor: "pointer",
              transition: "background 0.2s",
            }}
            onMouseEnter={() => setHovered("no")}
            onMouseLeave={() => setHovered(null)}
            onClick={onNo}
          >
            No
          </button>
        </div>
      </div>
    </div>
  );
}
