import React, { useState } from "react";

export default function PaymentPage() {
  const [activePayment, setActivePayment] = useState("Credit/Debit Card");
  const [saveHover, setSaveHover] = useState(false);

  const styles = {
    container: {
      display: "flex",
      minHeight: "100vh",
      background: "#10191B",
      fontFamily: "'Inter', sans-serif",
      color: "#E3F6FC",
      margin: 0,
      padding: 0,
    },
    sidebar: {
      background: "#142626",
      width: 80,
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      padding: "30px 0",
      gap: 30,
      borderTopLeftRadius: 20,
      borderBottomLeftRadius: 20,
    },
    sidebarImg: {
      width: 40,
      height: 40,
      background: "#1d3434",
      borderRadius: 12,
      marginBottom: 10,
      padding: 8,
      objectFit: "contain",
      boxSizing: "border-box",
      display: "block",
      transition: "background 0.2s",
      cursor: "pointer",
    },
    mainContent: {
      flex: 1,
      padding: "40px 60px",
      borderRadius: "0 20px 20px 0",
      background: "#10191B",
    },
    backLink: {
      color: "#2EC4B6",
      textDecoration: "none",
      fontSize: 15,
      marginBottom: 18,
      display: "inline-block",
      cursor: "pointer",
      userSelect: "none",
    },
    heading: {
      margin: "0 0 30px 0",
      fontWeight: 600,
      fontSize: 22,
    },
    sectionTitle: {
      fontWeight: 600,
      marginBottom: 10,
      fontSize: 16,
      color: "#B5D7E5",
    },
    formRow: {
      display: "flex",
      gap: 16,
      marginBottom: 18,
    },
    formGroup: {
      flex: 1,
      display: "flex",
      flexDirection: "column",
    },
    formGroupAddress: {
      flex: 2,
      display: "flex",
      flexDirection: "column",
    },
    label: {
      fontSize: 13,
      marginBottom: 6,
      color: "#B5D7E5",
    },
    input: {
      background: "#162024",
      border: "none",
      borderRadius: 8,
      padding: "10px 12px",
      color: "#E3F6FC",
      fontSize: 15,
      outline: "none",
      marginBottom: 0,
    },
    paymentMethods: {
      display: "flex",
      gap: 14,
      marginBottom: 20,
      flexWrap: "wrap",
    },
    payBtn: {
      background: "#223036",
      color: "#E3F6FC",
      border: "none",
      padding: "8px 22px",
      borderRadius: 8,
      fontSize: 15,
      cursor: "pointer",
      transition: "background 0.2s",
      userSelect: "none",
    },
    payBtnSelected: {
      background: "#2EC4B6",
      color: "#10191B",
      fontWeight: 600,
    },
    note: {
      fontSize: 12,
      color: "#7AAFC6",
      marginBottom: 20,
    },
    saveBtn: {
      background: "#2EC4B6",
      color: "#10191B",
      border: "none",
      padding: "12px 36px",
      borderRadius: 8,
      fontSize: 16,
      fontWeight: 600,
      cursor: "pointer",
      marginTop: 10,
      transition: "background 0.2s",
      userSelect: "none",
    },
    saveBtnHover: {
      background: "#27b09f",
    },
  };

  const paymentOptions = [
    "Credit/Debit Card",
    "Google Pay",
    "Paytm",
    "PhonePe",
  ];

  return (
    <div style={styles.container}>
      {/* Sidebar */}
      <div style={styles.sidebar}>
        {[
          { src: "icons/KaizenLogo.png", alt: "Logo" },
          { src: "icons/home.png", alt: "Home" },
          { src: "icons/stats.png", alt: "Analytics" },
          { src: "icons/meal.png", alt: "Documents" },
          { src: "icons/settings.png", alt: "Settings" },
          { src: "icons/logout.png", alt: "Logout" },
        ].map(({ src, alt }, i) => (
          <img
            key={i}
            src={src}
            alt={alt}
            style={styles.sidebarImg}
            onMouseEnter={(e) => (e.currentTarget.style.background = "#7ed6c0")}
            onMouseLeave={(e) => (e.currentTarget.style.background = "#1d3434")}
          />
        ))}
      </div>

      {/* Main Content */}
      <div style={styles.mainContent}>
        <a href="#" style={styles.backLink} onClick={(e) => e.preventDefault()}>
          &lt; Go Back
        </a>
        <h2 style={styles.heading}>Payment</h2>

        {/* Billing Address */}
        <div>
          <div style={styles.sectionTitle}>Billing Address</div>
          <div style={styles.formRow}>
            <div style={styles.formGroupAddress}>
              <label style={styles.label}>Address</label>
              <input
                type="text"
                value="5/11, Rhen Arcade 3, Yemlur Road, Behind Old Airport, Off Old Airport Road, Near ManipalHall"
                style={styles.input}
                readOnly
              />
            </div>
            <div style={styles.formGroup}>
              <label style={styles.label}>City</label>
              <input type="text" value="Bangalore" style={styles.input} readOnly />
            </div>
            <div style={styles.formGroup}>
              <label style={styles.label}>State</label>
              <input type="text" value="Karnataka" style={styles.input} readOnly />
            </div>
            <div style={styles.formGroup}>
              <label style={styles.label}>Pincode</label>
              <input type="text" value="560037" style={styles.input} readOnly />
            </div>
          </div>
        </div>

        {/* Payment Method */}
        <div>
          <div style={styles.sectionTitle}>Payment Method</div>
          <div style={styles.paymentMethods}>
            {paymentOptions.map((option) => {
              const selected = activePayment === option;
              return (
                <button
                  key={option}
                  type="button"
                  style={{
                    ...styles.payBtn,
                    ...(selected ? styles.payBtnSelected : {}),
                  }}
                  onClick={() => setActivePayment(option)}
                >
                  {option}
                </button>
              );
            })}
          </div>

          <div style={styles.formRow}>
            <div style={styles.formGroup}>
              <label style={styles.label}>Card Number</label>
              <input
                type="text"
                placeholder="Enter card number"
                style={styles.input}
                disabled={activePayment !== "Credit/Debit Card"}
              />
            </div>
          </div>

          <div style={styles.note}>
            * Some fields are auto-filled and may be locked for manual changes.
          </div>

          <button
            type="button"
            style={{
              ...styles.saveBtn,
              ...(saveHover ? styles.saveBtnHover : {}),
            }}
            onMouseEnter={() => setSaveHover(true)}
            onMouseLeave={() => setSaveHover(false)}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
