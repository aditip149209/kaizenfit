import React, { useState } from "react";

export default function EditSleepGoalModal({
  currentGoal = "7 hours 45 minutes",
  initialHours = 8,
  initialMinutes = 45,
  onClose = () => {},
  onSave = (hours, minutes) => {},
}) {
  const [hours, setHours] = useState(initialHours);
  const [minutes, setMinutes] = useState(initialMinutes);
  const [saveHover, setSaveHover] = useState(false);

  const modalBgStyle = {
    background: "rgba(0,0,0,0.45)",
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    width: "100vw",
    height: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 10,
  };

  const modalStyle = {
    background: "#073131",
    borderRadius: 14,
    minWidth: 320,
    maxWidth: 340,
    padding: "28px 28px 22px 28px",
    boxShadow: "0 4px 32px rgba(0,0,0,0.14)",
    position: "relative",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  };

  const closeBtnStyle = {
    position: "absolute",
    top: 14,
    right: 18,
    fontSize: "1.3rem",
    color: "#b2dfdb",
    background: "none",
    border: "none",
    cursor: "pointer",
    opacity: 0.7,
    transition: "opacity 0.2s",
  };

  const titleStyle = {
    fontSize: "1.15rem",
    color: "#e0f7fa",
    fontWeight: 500,
    marginBottom: 22,
    letterSpacing: 1,
    textAlign: "center",
  };

  const rowStyle = {
    width: "100%",
    marginBottom: 17,
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-start",
    fontSize: "1rem",
  };

  const labelStyle = {
    minWidth: 136,
    color: "#b2dfdb",
  };

  const currentGoalStyle = {
    color: "#e0f7fa",
    fontWeight: 500,
    marginLeft: 6,
  };

  const selectRowStyle = {
    ...rowStyle,
    gap: 10,
    marginBottom: 18,
  };

  const selectStyle = {
    background: "#0c1818",
    color: "#b2dfdb",
    border: "1px solid #1de9b6",
    borderRadius: 7,
    padding: "7px 16px 7px 10px",
    fontSize: "1rem",
    marginRight: 7,
    outline: "none",
    appearance: "none",
    minWidth: 60,
    transition: "border 0.2s",
  };

  const dividerStyle = {
    width: "100%",
    height: 1,
    background: "#155353",
    margin: "18px 0",
    border: "none",
  };

  const saveBtnStyle = {
    background: saveHover ? "#13b3b3" : "#178b8b",
    color: "#e0f7fa",
    border: "none",
    borderRadius: 8,
    padding: "9px 28px",
    fontSize: "1rem",
    fontWeight: 500,
    marginTop: 5,
    cursor: "pointer",
    boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
    transition: "background 0.18s",
  };

  return (
    <div style={modalBgStyle}>
      <div style={modalStyle}>
        <button
          style={closeBtnStyle}
          aria-label="Close"
          onClick={onClose}
          onMouseOver={e => (e.currentTarget.style.opacity = 1)}
          onMouseOut={e => (e.currentTarget.style.opacity = 0.7)}
        >
          &times;
        </button>
        <div style={titleStyle}>EDIT SLEEP GOAL</div>
        <div style={rowStyle}>
          <label style={labelStyle}>Current Sleep Goal:</label>
          <span style={currentGoalStyle}>{currentGoal}</span>
        </div>
        <div style={selectRowStyle}>
          <label style={{ minWidth: 130 }}>New Sleep Goal:</label>
          <select
            value={hours}
            onChange={e => setHours(Number(e.target.value))}
            style={selectStyle}
          >
            {[5, 6, 7, 8, 9, 10].map(hr => (
              <option key={hr} value={hr}>{hr}</option>
            ))}
          </select>
          <span>hrs</span>
          <select
            value={minutes}
            onChange={e => setMinutes(Number(e.target.value))}
            style={selectStyle}
          >
            {[0, 15, 30, 45].map(min => (
              <option key={min} value={min}>
                {min.toString().padStart(2, "0")}
              </option>
            ))}
          </select>
          <span>min</span>
        </div>
        <div style={dividerStyle}></div>
        <button
          style={saveBtnStyle}
          onMouseEnter={() => setSaveHover(true)}
          onMouseLeave={() => setSaveHover(false)}
          onClick={() => onSave(hours, minutes)}
        >
          Save Goal
        </button>
      </div>
    </div>
  );
}
