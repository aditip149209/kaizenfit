import React, { useState } from "react";

function YourPlanPage() {
  const [activeButton, setActiveButton] = useState("Change Plan");

  const styles = {
    container: {
      display: "flex",
      minHeight: "100vh",
      borderRadius: 22,
      overflow: "hidden",
      backgroundColor: "#0b181a",
      fontFamily: "'Inter', sans-serif",
      color: "#e3f6fc",
    },
    sidebar: {
      width: 90,
      background: "#162224",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      padding: "32px 0",
      gap: 18,
      borderRadius: "22px 0 0 22px",
    },
    logo: {
      marginBottom: 36,
    },
    iconLink: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      width: 48,
      height: 48,
      borderRadius: 12,
      background: "#223036",
      marginBottom: 12,
      cursor: "pointer",
      transition: "background 0.2s",
    },
    iconImg: {
      width: 28,
      height: 28,
      objectFit: "contain",
    },
    mainPanel: {
      flex: 1,
      display: "flex",
      flexDirection: "row",
      padding: "48px 0",
      minWidth: 0,
    },
    settingsNav: {
      width: 180,
      paddingLeft: 38,
      display: "flex",
      flexDirection: "column",
      gap: 6,
    },
    navTitle: {
      fontSize: "1.13rem",
      fontWeight: 600,
      color: "#e3f6fc",
      marginBottom: 22,
    },
    navButton: (active) => ({
      padding: "10px 18px",
      borderRadius: 8,
      fontSize: "1rem",
      textAlign: "left",
      cursor: "pointer",
      border: "none",
      background: "none",
      fontFamily: "inherit",
      fontWeight: active ? 600 : 400,
      color: active ? "#fff" : "#b5d7e5",
      backgroundColor: active ? "#2ec4b6" : "transparent",
    }),
    settingsContent: {
      flex: 1,
      display: "flex",
      alignItems: "flex-start",
      justifyContent: "flex-start",
      paddingLeft: 60,
    },
    card: {
      background: "#0e2324",
      borderRadius: 18,
      padding: "36px 38px 28px 38px",
      minWidth: 420,
      maxWidth: 520,
      color: "#e3f6fc",
      boxShadow: "0 2px 12px rgba(0,0,0,0.08)",
      display: "flex",
      flexDirection: "column",
      gap: 16,
    },
    planTitle: {
      fontSize: "1.13rem",
      fontWeight: 600,
      marginBottom: 18,
    },
    label: {
      fontSize: "0.98rem",
      color: "#b5d7e5",
      marginBottom: 6,
    },
    button: (active, danger, alt) => ({
      padding: "8px 20px",
      borderRadius: 8,
      fontSize: "1rem",
      fontWeight: 600,
      border: "none",
      cursor: "pointer",
      transition: "background 0.2s",
      backgroundColor: active
        ? "#f4d35e"
        : alt
        ? "#2ec4b6"
        : danger
        ? "#e74c3c"
        : "#223036",
      color: alt ? "#fff" : active ? "#222" : "#b5d7e5",
      fontWeight: active ? 600 : 500,
      marginRight: 10,
    }),
    // Additional styles can be added as needed
  };

  return (
    <div style={styles.container}>
      {/* Sidebar */}
      <div style={styles.sidebar}>
        {/* Replace src with your icons */}
        {[
          { src: "icons/KaizenLogo.png", alt: "Logo" },
          { src: "icons/home.png", alt: "Home" },
          { src: "icons/stats.png", alt: "Analytics" },
          { src: "icons/meal.png", alt: "Diet" },
          { src: "icons/settings.png", alt: "Settings" },
          { src: "icons/logout.png", alt: "Logout" },
        ].map((icon, index) => (
          <a key={index} href="#" style={styles.iconLink}>
            <img src={icon.src} alt={icon.alt} style={styles.iconImg} />
          </a>
        ))}
      </div>

      {/* Main Content */}
      <div style={styles.mainPanel}>
        {/* Navigation */}
        <nav style={styles.settingsNav}>
          <div style={styles.navTitle}>Settings</div>
          {["Profile", "Account", "Your Plan", "Help"].map((name) => (
            <button
              key={name}
              style={styles.navButton(name === "Your Plan")}
              onClick={() => alert(`Navigate to ${name}`)}
            >
              {name}
            </button>
          ))}
        </nav>

        {/* Content */}
        <div style={styles.settingsContent}>
          <div style={styles.card}>
            <div style={styles.planTitle}>Your Plan</div>

            {/* Plan Options */}
            <div style={{ display: "flex", gap: 10, marginBottom: 16 }}>
              <button style={styles.button(true, false, false)}>Current Plan</button>
              <button style={styles.button(false, false, true)}>Change Plan</button>
              <button style={styles.button(false, false, true)}>Pause Plan</button>
            </div>

            {/* Billing Details */}
            <div style={{ display: "flex", alignItems: "center", marginBottom: 16 }}>
              <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
                <div style={styles.label}>Billing Details</div>
                <div style={{ color: "#b5d7e5" }}>Billed every 1 year for 1 user</div>
              </div>
              <button style={styles.button(false, true, false)}>Deactivate</button>
            </div>

            {/* Payment Method */}
            <div style={{ display: "flex", alignItems: "center", marginBottom: 16 }}>
              <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
                <div style={styles.label}>Mode of Payment</div>
                <div style={{ color: "#b5d7e5" }}>Credit Card (**** 1234)</div>
              </div>
              <button style={styles.button(false, false, false)}>Change Payment Method</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default YourPlanPage;
