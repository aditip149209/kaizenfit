import React, { useState } from "react";

export default function HelpSettings() {
  const [activeNav, setActiveNav] = useState("Help");

  const styles = {
    container: {
      display: "flex",
      minHeight: "100vh",
      borderRadius: 22,
      overflow: "hidden",
      background: "#0b181a",
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
    iconLink: (active) => ({
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      width: 48,
      height: 48,
      borderRadius: 12,
      background: active ? "#2ec4b6" : "#223036",
      marginBottom: 12,
      cursor: "pointer",
      transition: "background 0.2s",
    }),
    iconImg: (active) => ({
      width: 28,
      height: 28,
      display: "block",
      margin: "auto",
      filter: active ? "none" : "brightness(0) invert(1) grayscale(1) opacity(0.85)",
      transition: "filter 0.2s",
    }),
    sidebarBottom: {
      marginTop: "auto",
      marginBottom: 10,
    },
    mainPanel: {
      flex: 1,
      background: "#112224",
      borderRadius: "0 22px 22px 0",
      padding: "48px 0",
      minWidth: 0,
      display: "flex",
      flexDirection: "row",
      minHeight: "100vh",
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
    navLink: (active) => ({
      color: active ? "#fff" : "#b5d7e5",
      background: active ? "#2ec4b6" : "none",
      fontWeight: active ? 600 : 400,
      border: "none",
      padding: "10px 18px",
      borderRadius: 8,
      fontSize: "1rem",
      textAlign: "left",
      cursor: "pointer",
      transition: "background 0.2s, color 0.2s",
      marginBottom: 2,
      fontFamily: "inherit",
    }),
    settingsContent: {
      flex: 1,
      display: "flex",
      alignItems: "flex-start",
      justifyContent: "flex-start",
      paddingLeft: 60,
    },
    settingsCard: {
      background: "#0e2324",
      borderRadius: 18,
      padding: "36px 38px 28px 38px",
      minWidth: 420,
      maxWidth: 520,
      color: "#e3f6fc",
      boxShadow: "0 2px 12px 0 rgba(0,0,0,0.08)",
      marginTop: 8,
    },
    helpTitle: {
      fontSize: "1.13rem",
      fontWeight: 600,
      marginBottom: 18,
    },
    helpActions: {
      display: "flex",
      gap: 16,
      marginTop: 14,
    },
    helpBtn: {
      padding: "8px 22px",
      borderRadius: 8,
      fontSize: "1rem",
      fontWeight: 600,
      border: "none",
      cursor: "pointer",
      transition: "background 0.2s, color 0.2s",
      background: "#2ec4b6",
      color: "#fff",
    },
    helpBtnHover: {
      background: "#22b5a5",
    },
    helpBtnSecondary: {
      padding: "8px 22px",
      borderRadius: 8,
      fontSize: "1rem",
      fontWeight: 600,
      border: "1px solid #e57373",
      background: "transparent",
      color: "#e57373",
      cursor: "pointer",
      transition: "background 0.2s, color 0.2s",
    },
    helpBtnSecondaryHover: {
      background: "#e57373",
      color: "#fff",
    },
  };

  // Sidebar icons data
  const sidebarIcons = [
    { src: "icons/KaizenLogo.png", alt: "Logo", isLogo: true },
    { src: "icons/home.png", alt: "Home" },
    { src: "icons/stats.png", alt: "Analytics" },
    { src: "icons/meal.png", alt: "Billing" },
    { src: "icons/settings.png", alt: "Settings", active: true },
    { src: "icons/logout.png", alt: "Logout", bottom: true },
  ];

  // Settings nav links
  const navLinks = ["Profile", "Account", "Your Plan", "Help"];

  // Button hover states
  const [helpBtnHover, setHelpBtnHover] = useState(false);
  const [helpBtnSecondaryHover, setHelpBtnSecondaryHover] = useState(false);

  return (
    <div style={styles.container}>
      {/* Sidebar */}
      <div style={styles.sidebar}>
        <div style={styles.logo}>
          <img src="icons/KaizenLogo.png" alt="Logo" style={{ width: 40, height: 40 }} />
        </div>
        <a href="#" style={styles.iconLink(false)}>
          <img src="icons/home.png" alt="Home" style={styles.iconImg(false)} />
        </a>
        <a href="#" style={styles.iconLink(false)}>
          <img src="icons/stats.png" alt="Analytics" style={styles.iconImg(false)} />
        </a>
        <a href="#" style={styles.iconLink(false)}>
          <img src="icons/meal.png" alt="Billing" style={styles.iconImg(false)} />
        </a>
        <a href="#" style={styles.iconLink(true)}>
          <img src="icons/settings.png" alt="Settings" style={styles.iconImg(true)} />
        </a>
        <div style={styles.sidebarBottom}>
          <a href="#" style={styles.iconLink(false)}>
            <img src="icons/logout.png" alt="Logout" style={styles.iconImg(false)} />
          </a>
        </div>
      </div>

      {/* Main Panel */}
      <div style={styles.mainPanel}>
        <nav style={styles.settingsNav}>
          <div style={styles.navTitle}>Settings</div>
          {navLinks.map((link) => (
            <button
              key={link}
              style={styles.navLink(link === activeNav)}
              onClick={() => setActiveNav(link)}
            >
              {link}
            </button>
          ))}
        </nav>
        <div style={styles.settingsContent}>
          <div style={styles.settingsCard}>
            <div style={styles.helpTitle}>Help</div>
            <div style={styles.helpActions}>
              <button
                style={{
                  ...styles.helpBtn,
                  ...(helpBtnHover ? styles.helpBtnHover : {}),
                }}
                onMouseEnter={() => setHelpBtnHover(true)}
                onMouseLeave={() => setHelpBtnHover(false)}
                onClick={() => alert("Contact Us clicked")}
              >
                Contact Us
              </button>
              <button
                style={{
                  ...styles.helpBtnSecondary,
                  ...(helpBtnSecondaryHover ? styles.helpBtnSecondaryHover : {}),
                }}
                onMouseEnter={() => setHelpBtnSecondaryHover(true)}
                onMouseLeave={() => setHelpBtnSecondaryHover(false)}
                onClick={() => alert("Deactivate clicked")}
              >
                Deactivate
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
