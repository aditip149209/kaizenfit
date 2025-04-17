import React, { useState } from "react";

export default function PaymentPage() {
  const [activePayment, setActivePayment] = useState("Credit/Debit Card");

  const styles = {
    container: {
      display: "flex",
      minHeight: "100vh",
      background: "#101c1c",
      fontFamily: "'Montserrat', sans-serif",
      color: "#e7f6f2",
      margin: 0,
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
    sidebarImgHover: {
      background: "#7ed6c0",
    },
    mainContent: {
      flex: 1,
      padding: 40,
      display: "flex",
      flexDirection: "column",
      gap: 25,
      color: "#e7f6f2",
    },
    backButton: {
      display: "flex",
      alignItems: "center",
      color: "#e7f6f2",
      textDecoration: "none",
      fontSize: "0.9rem",
      marginBottom: 10,
      cursor: "pointer",
      userSelect: "none",
    },
    backButtonArrow: {
      marginRight: 8,
      fontWeight: "bold",
    },
    sectionHeader: {
      fontSize: "1.1rem",
      fontWeight: 500,
      marginBottom: 15,
      color: "#e7f6f2",
      paddingBottom: 8,
      borderBottom: "1px solid #1d3434",
    },
    billingSection: {
      marginBottom: 25,
    },
    addressGrid: {
      display: "grid",
      gridTemplateColumns: "3fr 1fr 1fr 1fr",
      gap: 15,
      marginBottom: 25,
    },
    addressFieldContainer: {
      display: "flex",
      flexDirection: "column",
    },
    addressFieldLabel: {
      fontSize: "0.8rem",
      color: "#7ed6c0",
      marginBottom: 5,
    },
    addressField: {
      background: "#142626",
      borderRadius: 8,
      padding: "12px 15px",
      color: "#a0c7c7",
      fontSize: "0.9rem",
      userSelect: "text",
    },
    paymentSection: {
      marginBottom: 25,
    },
    paymentMethods: {
      display: "flex",
      gap: 15,
      marginBottom: 20,
      flexWrap: "wrap",
    },
    paymentOption: {
      background: "#142626",
      borderRadius: 8,
      padding: "12px 20px",
      color: "#a0c7c7",
      fontSize: "0.9rem",
      cursor: "pointer",
      transition: "background 0.2s, border-color 0.2s",
      border: "1px solid transparent",
      userSelect: "none",
      whiteSpace: "nowrap",
    },
    paymentOptionActive: {
      borderColor: "#7ed6c0",
      background: "#1d3434",
      color: "#7ed6c0",
    },
    cardDetails: {
      display: "grid",
      gridTemplateColumns: "1fr 1fr 1fr",
      gap: 15,
      marginBottom: 15,
    },
    cardInputContainer: {
      display: "flex",
      flexDirection: "column",
    },
    cardInputLabel: {
      fontSize: "0.8rem",
      color: "#7ed6c0",
      marginBottom: 5,
    },
    cardInput: {
      background: "#142626",
      borderRadius: 8,
      padding: "12px 15px",
      color: "#a0c7c7",
      fontSize: "0.9rem",
      border: "none",
      outline: "none",
      userSelect: "text",
    },
    termsText: {
      fontSize: "0.8rem",
      color: "#a0c7c7",
      margin: "20px 0",
      lineHeight: 1.4,
    },
    saveBtn: {
      background: "#1dbd6b",
      color: "#fff",
      border: "none",
      borderRadius: 10,
      padding: "10px 25px",
      fontSize: "0.95rem",
      fontWeight: 500,
      cursor: "pointer",
      transition: "background 0.2s",
      alignSelf: "flex-start",
      userSelect: "none",
    },
    saveBtnHover: {
      background: "#16a05b",
    },
  };

  // For hover effect on Save button
  const [saveHover, setSaveHover] = useState(false);

  // For hover effect on sidebar icons - optional, here static for simplicity

  // Payment options
  const paymentOptions = [
    "Credit/Debit Card",
    "Google Pay",
    "Paytm",
    "Phone Pe",
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
        <a href="#" style={styles.backButton} onClick={(e) => e.preventDefault()}>
          <span style={styles.backButtonArrow}>←</span> Go Back
        </a>

        <div className="payment-container">
          <h2 style={styles.sectionHeader}>Payment</h2>

          {/* Billing Address */}
          <div style={styles.billingSection}>
            <h3 style={styles.sectionHeader}>Billing Address</h3>

            <div style={styles.addressGrid}>
              <div style={styles.addressFieldContainer}>
                <span style={styles.addressFieldLabel}>Address</span>
                <div style={styles.addressField}>
                  3-766, Kodipur, Anekal-2, Jigani Road, Behind Old Airport, Kogilu, Off Old Airport Road, Near Marathahalli
                </div>
              </div>

              <div style={styles.addressFieldContainer}>
                <span style={styles.addressFieldLabel}>City</span>
                <div style={styles.addressField}>Bangalore</div>
              </div>

              <div style={styles.addressFieldContainer}>
                <span style={styles.addressFieldLabel}>State</span>
                <div style={styles.addressField}>Karnataka</div>
              </div>

              <div style={styles.addressFieldContainer}>
                <span style={styles.addressFieldLabel}>Pincode</span>
                <div style={styles.addressField}>560037</div>
              </div>
            </div>
          </div>

          {/* Payment Method */}
          <div style={styles.paymentSection}>
            <h3 style={styles.sectionHeader}>Payment Method</h3>

            <div style={styles.paymentMethods}>
              {paymentOptions.map((option) => {
                const isActive = activePayment === option;
                return (
                  <div
                    key={option}
                    style={{
                      ...styles.paymentOption,
                      ...(isActive ? styles.paymentOptionActive : {}),
                    }}
                    onClick={() => setActivePayment(option)}
                  >
                    {option}
                  </div>
                );
              })}
            </div>

            {activePayment === "Credit/Debit Card" && (
              <div style={styles.cardDetails}>
                <div style={styles.cardInputContainer}>
                  <label style={styles.cardInputLabel} htmlFor="cardNumber">
                    Card Number
                  </label>
                  <input
                    id="cardNumber"
                    type="text"
                    placeholder="XXXX XXXX XXXX XXXX"
                    style={styles.cardInput}
                  />
                </div>
                <div style={styles.cardInputContainer}>
                  <label style={styles.cardInputLabel} htmlFor="expiration">
                    Expiration (MM/YY)
                  </label>
                  <input
                    id="expiration"
                    type="text"
                    placeholder="MM/YY"
                    style={styles.cardInput}
                  />
                </div>
                <div style={styles.cardInputContainer}>
                  <label style={styles.cardInputLabel} htmlFor="cvv">
                    CVV
                  </label>
                  <input
                    id="cvv"
                    type="text"
                    placeholder="XXX"
                    style={styles.cardInput}
                  />
                </div>
              </div>
            )}
          </div>

          <div style={styles.termsText}>
            By proceeding with payment, you agree to our Terms of Service and Privacy Policy. Your card will be charged ₹1,499.00 for the annual subscription.
          </div>

          <button
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
