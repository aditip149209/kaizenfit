import React from "react";

function ViewWorkout() {
  const styles = {
    overlay: {
      position: "fixed",
      top: 0,
      left: 0,
      width: "100vw",
      height: "100vh",
      backgroundColor: "rgba(0,0,0,0.45)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      zIndex: 1000,
    },
    modal: {
      background: "#073032",
      borderRadius: 14,
      width: 340,
      padding: "28px 22px 22px 22px",
      boxShadow: "0 4px 24px rgba(0,0,0,0.16)",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      position: "relative",
    },
    header: {
      width: "100%",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: 18,
    },
    title: {
      fontSize: "1.05rem",
      fontWeight: 600,
      letterSpacing: 1,
      color: "#e0f7fa",
    },
    closeButton: {
      fontSize: "1.2rem",
      color: "#e0f7fa",
      background: "none",
      border: "none",
      cursor: "pointer",
      fontWeight: 700,
      lineHeight: 1,
      padding: 0,
      transition: "color 0.2s",
    },
    closeButtonHover: {
      color: "#e74c3c",
    },
    input: {
      width: "100%",
      background: "#0a2324",
      border: "none",
      borderRadius: 8,
      padding: "9px 12px",
      fontSize: "1rem",
      fontFamily: "'Montserrat', sans-serif",
      fontWeight: 500,
      letterSpacing: 1,
      color: "#e7f6f2",
      textAlign: "center",
      marginBottom: 18,
      outline: "none",
    },
    table: {
      width: "100%",
      borderCollapse: "separate",
      borderSpacing: "0 10px",
      marginBottom: 24,
    },
    thTd: {
      background: "#0a2324",
      padding: "9px 0",
      border: "none",
      borderRadius: 8,
      fontSize: "0.95rem",
      color: "#b2dfdb",
      textAlign: "center",
    },
    th: {
      color: "#7ed6c0",
      fontSize: "0.94rem",
      fontWeight: 600,
      letterSpacing: 0.5,
    },
    button: {
      background: "#1dbd6b",
      color: "#fff",
      border: "none",
      borderRadius: 8,
      padding: "9px 18px",
      fontSize: "1rem",
      fontWeight: 600,
      cursor: "pointer",
      transition: "background 0.2s",
      marginBottom: 7,
    },
    buttonHover: {
      background: "#16a05b",
    },
  };

  const [hoverClose, setHoverClose] = React.useState(false);
  const [hoverSave, setHoverSave] = React.useState(false);

  return (
    <div style={styles.overlay}>
      <div style={styles.modal}>
        {/* Header */}
        <div style={styles.header}>
          <div style={styles.title}>VIEW WORKOUT</div>
          <button
            style={{
              ...styles.closeButton,
              ...(hoverClose ? styles.closeButtonHover : {}),
            }}
            onMouseEnter={() => setHoverClose(true)}
            onMouseLeave={() => setHoverClose(false)}
            onClick={() => alert("Close clicked")}
            aria-label="Close"
          >
            &times;
          </button>
        </div>
        {/* Workout Name */}
        <input
          style={styles.input}
          value="FULL BODY HIIT"
          readOnly
        />
        {/* Exercise Table */}
        <table style={styles.table}>
          <thead>
            <tr>
              <th style={{ ...styles.thTd, ...styles.th }}>EXERCISE NAME</th>
              <th style={{ ...styles.thTd, ...styles.th }}>SETS</th>
              <th style={{ ...styles.thTd, ...styles.th }}>REPS</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style={styles.thTd}>Pushups</td>
              <td style={styles.thTd}>3</td>
              <td style={styles.thTd}>15</td>
            </tr>
            <tr>
              <td style={styles.thTd}>Donkey Kicks</td>
              <td style={styles.thTd}>4</td>
              <td style={styles.thTd}>15</td>
            </tr>
            <tr>
              <td style={styles.thTd}>Low Plank</td>
              <td style={styles.thTd}>5</td>
              <td style={styles.thTd}>30 sec</td>
            </tr>
            <tr>
              <td style={styles.thTd}>High Plank</td>
              <td style={styles.thTd}>5</td>
              <td style={styles.thTd}>30 sec</td>
            </tr>
            <tr>
              <td style={styles.thTd}>Tuck Ins</td>
              <td style={styles.thTd}>5</td>
              <td style={styles.thTd}>15</td>
            </tr>
          </tbody>
        </table>
        {/* Buttons */}
        <button
          style={styles.button}
          onMouseEnter={() => setHoverSave(true)}
          onMouseLeave={() => setHoverSave(false)}
          onClick={() => alert("View Workout")}
        >
          VIEW WORKOUT
        </button>
        <button
          style={{
            ...styles.button,
            background: hoverSave ? "#16a05b" : styles.button.background,
            marginTop: 7,
          }}
          onMouseEnter={() => setHoverSave(true)}
          onMouseLeave={() => setHoverSave(false)}
          onClick={() => alert("Mark as completed")}
        >
          MARK AS COMPLETED
        </button>
      </div>
    </div>
  );
}
