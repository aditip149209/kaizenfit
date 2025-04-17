import React, { useState } from "react";

export default function StepGoalModal({ 
  currentGoal = 8000, 
  initialNewGoal = 20000, 
  onClose = () => {}, 
  onSave = (newGoal) => {} 
}) {
  const [newGoal, setNewGoal] = useState(initialNewGoal);
  const [saveHover, setSaveHover] = useState(false);

  const styles = {
    modal: {
      background: "#13332f",
      color: "#fff",
      width: 350,
      margin: "60px auto",
      borderRadius: 10,
      boxShadow: "0 4px 24px rgba(0,0,0,0.3)",
      padding: "32px 28px 24px 28px",
      position: "relative",
      fontFamily: "'Segoe UI', Arial, sans-serif",
    },
    closeBtn: {
      position: "absolute",
      top: 16,
      right: 18,
      fontSize: "1.3rem",
      color: "#fff",
      cursor: "pointer",
      userSelect: "none",
      background: "none",
      border: "none",
    },
    heading: {
      marginTop: 0,
      fontSize: "1.1rem",
      fontWeight: 600,
      letterSpacing: 1,
      textAlign: "center",
      marginBottom: 30,
    },
    currentGoalText: {
      marginBottom: 18,
      fontSize: "1rem",
      color: "#b2ccc7",
      textAlign: "center",
    },
    label: {
      fontSize: "0.98rem",
      marginBottom: 6,
      display: "block",
      color: "#b2ccc7",
    },
    inputRow: {
      display: "flex",
      alignItems: "center",
      marginBottom: 36,
      justifyContent: "center",
      gap: 8,
    },
    inputNumber: {
      width: 120,
      padding: "7px 10px",
      borderRadius: 6,
      border: "none",
      fontSize: "1rem",
      background: "#1c423a",
      color: "#fff",
      outline: "none",
      textAlign: "center",
    },
    inputSpan: {
      fontSize: "1rem",
      color: "#b2ccc7",
    },
    hr: {
      border: "none",
      borderTop: "1px solid #224b41",
      margin: "24px 0 18px 0",
    },
    saveBtn: {
      display: "block",
      margin: "0 auto",
      background: saveHover ? "#21a88b" : "#29c7a7",
      color: "#fff",
      border: "none",
      borderRadius: 7,
      padding: "7px 28px",
      fontSize: "1rem",
      fontWeight: 500,
      cursor: "pointer",
      transition: "background 0.2s",
      userSelect: "none",
    },
  };

  return (
    <div style={styles.modal}>
      <button
        aria-label="Close"
        style={styles.closeBtn}
        onClick={onClose}
        onMouseEnter={e => (e.currentTarget.style.opacity = "0.8")}
        onMouseLeave={e => (e.currentTarget.style.opacity = "1")}
      >
        &times;
      </button>
      <h2 style={styles.heading}>EDIT STEP GOAL</h2>
      <div style={styles.currentGoalText}>
        Current Step Goal: &nbsp; <strong>{currentGoal.toLocaleString()} steps</strong>
      </div>
      <label htmlFor="newStepGoal" style={styles.label}>New Step Goal:</label>
      <div style={styles.inputRow}>
        <input
          id="newStepGoal"
          type="number"
          min={0}
          value={newGoal}
          onChange={(e) => setNewGoal(Number(e.target.value))}
          style={styles.inputNumber}
        />
        <span style={styles.inputSpan}>steps</span>
      </div>
      <hr style={styles.hr} />
      <button
        style={styles.saveBtn}
        onMouseEnter={() => setSaveHover(true)}
        onMouseLeave={() => setSaveHover(false)}
        onClick={() => onSave(newGoal)}
      >
        Save Goal
      </button>
    </div>
  );
}
