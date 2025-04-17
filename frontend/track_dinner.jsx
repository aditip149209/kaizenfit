import React, { useState } from "react";

export default function TrackDinnerModal({
  onClose = () => {},
  onSave = (data) => {},
}) {
  const [dish, setDish] = useState("");
  const [quantity, setQuantity] = useState("");
  const [measure, setMeasure] = useState("g");
  const [saveHover, setSaveHover] = useState(false);

  // Static macro data; replace with dynamic logic if needed
  const macros = {
    calories: 73,
    carbs: 8.3,
    proteins: 3.0,
    fats: 1.0,
  };

  const styles = {
    modalBg: {
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
    },
    modal: {
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
      color: "#b2dfdb",
      fontFamily: "'Segoe UI', Arial, sans-serif",
    },
    closeBtn: {
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
    },
    title: {
      fontSize: "1.08rem",
      color: "#e0f7fa",
      fontWeight: 500,
      marginBottom: 22,
      letterSpacing: 1,
      textAlign: "center",
    },
    form: {
      width: "100%",
    },
    modalRow: {
      width: "100%",
      marginBottom: 17,
      display: "flex",
      alignItems: "center",
      justifyContent: "flex-start",
      fontSize: "1rem",
    },
    label: {
      minWidth: 90,
      color: "#b2dfdb",
      fontSize: "0.98rem",
      marginBottom: 3,
    },
    input: {
      background: "#0c1818",
      color: "#b2dfdb",
      border: "1px solid #1de9b6",
      borderRadius: 7,
      padding: "7px 12px",
      fontSize: "1rem",
      marginRight: 10,
      outline: "none",
      marginBottom: 0,
      transition: "border 0.2s",
    },
    select: {
      background: "#0c1818",
      color: "#b2dfdb",
      border: "1px solid #1de9b6",
      borderRadius: 7,
      padding: "7px 12px",
      fontSize: "1rem",
      marginRight: 10,
      outline: "none",
      marginBottom: 0,
      transition: "border 0.2s",
      minWidth: 60,
      appearance: "none",
    },
    quantityRow: {
      gap: 10,
      marginBottom: 17,
      display: "flex",
      alignItems: "center",
      width: "100%",
    },
    macroSectionTitle: {
      color: "#b2dfdb",
      fontSize: "0.98rem",
      marginBottom: 9,
      marginTop: 6,
      width: "100%",
    },
    macroBox: {
      background: "#094040",
      borderRadius: 14,
      padding: "16px 18px 12px 18px",
      width: "100%",
      marginBottom: 18,
      boxSizing: "border-box",
      display: "flex",
      flexDirection: "column",
      gap: 7,
    },
    macroCalories: {
      color: "#e0f7fa",
      fontSize: "1.1rem",
      fontWeight: 500,
      marginBottom: 6,
    },
    macroCaloriesValue: {
      fontSize: "1.2rem",
      fontWeight: 600,
    },
    macroRow: {
      display: "flex",
      alignItems: "center",
      gap: 9,
      fontSize: "0.97rem",
      color: "#b2dfdb",
    },
    macroIcon: {
      width: 17,
      height: 17,
      display: "inline-block",
      marginRight: 2,
      filter: "brightness(0) invert(0.7)",
    },
    macroValue: {
      marginLeft: "auto",
    },
    divider: {
      width: "100%",
      height: 1,
      background: "#155353",
      margin: "14px 0",
      border: "none",
    },
    saveBtn: {
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
      marginLeft: "auto",
      marginRight: "auto",
      display: "block",
    },
  };

  function handleSubmit(e) {
    e.preventDefault();
    onSave({ dish, quantity, measure });
  }

  return (
    <div style={styles.modalBg}>
      <div style={styles.modal}>
        <button
          style={styles.closeBtn}
          aria-label="Close"
          onClick={onClose}
          onMouseEnter={e => (e.currentTarget.style.opacity = 1)}
          onMouseLeave={e => (e.currentTarget.style.opacity = 0.7)}
        >
          &times;
        </button>
        <div style={styles.title}>TRACK DINNER</div>
        <form style={styles.form} onSubmit={handleSubmit}>
          <div style={styles.modalRow}>
            <label htmlFor="dish" style={styles.label}>Dish</label>
            <input
              id="dish"
              type="text"
              placeholder="Search by Food Name/Dish"
              value={dish}
              onChange={e => setDish(e.target.value)}
              style={{ ...styles.input, width: "100%" }}
            />
          </div>
          <div style={styles.quantityRow}>
            <label htmlFor="quantity" style={styles.label}>Quantity</label>
            <input
              id="quantity"
              type="text"
              value={quantity}
              onChange={e => setQuantity(e.target.value)}
              style={{ ...styles.input, width: 60 }}
            />
            <select
              id="measure"
              value={measure}
              onChange={e => setMeasure(e.target.value)}
              style={styles.select}
            >
              <option value="g">g</option>
              <option value="ml">ml</option>
              <option value="pcs">pcs</option>
            </select>
          </div>
          <div style={styles.macroSectionTitle}>Macronutrients Breakdown</div>
          <div style={styles.macroBox}>
            <div style={styles.macroCalories}>
              Calories<br />
              <span style={styles.macroCaloriesValue}>{macros.calories} cal</span>
            </div>
            <div style={styles.macroRow}>
              <img
                className="macro-icon"
                src="https://cdn-icons-png.flaticon.com/512/3075/3075977.png"
                alt="Carbs"
                style={styles.macroIcon}
              />
              Carbs <span style={styles.macroValue}>{macros.carbs} g</span>
            </div>
            <div style={styles.macroRow}>
              <img
                className="macro-icon"
                src="https://cdn-icons-png.flaticon.com/512/1046/1046750.png"
                alt="Proteins"
                style={styles.macroIcon}
              />
              Proteins <span style={styles.macroValue}>{macros.proteins} g</span>
            </div>
            <div style={styles.macroRow}>
              <img
                className="macro-icon"
                src="https://cdn-icons-png.flaticon.com/512/616/616490.png"
                alt="Fats"
                style={styles.macroIcon}
              />
              Fats <span style={styles.macroValue}>{macros.fats} g</span>
            </div>
          </div>
          <button
            type="submit"
            style={styles.saveBtn}
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
