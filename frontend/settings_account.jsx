import React, { useState } from "react";

export default function SettingsAccount() {
  const [activeNav, setActiveNav] = useState("Account");

  const styles = {
    container: {
      display: "flex",
      minHeight: "100vh",
      borderRadius: 22,
      overflow: "hidden",
      background: "#0b181a",
      fontFamily: "'Inter', sans-serif",
      color: "#e3f6fc",
      margin: 0,
      padding: 0,
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
    logoWrapper: {
      marginBottom: 36,
    },
    logoImg: {
      width: 40,
      height: 40,
    },
    iconLink: {
      display: "block",
      width: 48,
      height: 48,
      marginBottom: 12,
      borderRadius: 12,
      background: "#223036",
      displayFlex: "flex",
      alignItems: "center",
      justifyContent: "center",
      cursor: "pointer",
      transition: "background 0.2s",
    },
    iconLinkActive: {
      background: "#2ec4b6",
    },
    iconImg: {
      width: 28,
      height: 28,
      display: "block",
      margin: "auto",
      filter: "brightness(0) invert(1) grayscale(1) opacity(0.85)",
      transition: "filter 0.2s",
    },
    iconImgActive: {
      filter: "none",
    },
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
    navLink: {
      color: "#b5d7e5",
      background: "none",
      border: "none",
      padding: "10px 18px",
      borderRadius: 8,
      fontSize: "1rem",
      textAlign: "left",
      cursor: "pointer",
      transition: "background 0.2s, color 0.2s",
      marginBottom: 2,
      fontFamily: "inherit",
    },
    navLinkActive: {
      background: "#2ec4b6",
      color: "#fff",
      fontWeight: 600,
    },
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
      display: "flex",
      flexDirection: "column",
    },
    cardTitle: {
      marginBottom: 18,
      fontSize: "1.13rem",
      fontWeight: 600,
    },
    label: {
      fontSize: "0.98rem",
      color: "#b5d7e5",
      marginBottom: 6,
      display: "block",
    },
    input: {
      width: "100%",
      background: "transparent",
      border: "1px solid #244043",
      borderRadius: 8,
      padding: "10px 12px",
      color: "#e3f6fc",
      fontSize: "1rem",
      outline: "none",
      marginBottom: 18,
    },
    inputReadonly: {
      color: "#b5d7e5",
    },
    row: {
      display: "flex",
      alignItems: "center",
      gap: 12,
      marginBottom: 18,
    },
    rowInput: {
      marginBottom: 0,
      width: 180,
    },
    btn: {
      background: "#2ec4b6",
      color: "#fff",
      border: "none",
      padding: "8px 20px",
      borderRadius: 8,
      fontSize: "1rem",
      fontWeight: 600,
      cursor: "pointer",
      transition: "background 0.2s",
      marginTop: 0,
      marginBottom: 0,
    },
    btnHover: {
      background: "#22b5a5",
    },
    deviceList: {
      fontSize: "0.97rem",
      color: "#b5d7e5",
      marginBottom: 18,
      marginTop: 8,
      lineHeight: 1.3,
    },
    deviceListStrong: {
      color: "#e3f6fc",
    },
    saveBtn: {
      background: "#2ec4b6",
      color: "#fff",
      border: "none",
      padding: "10px 32px",
      borderRadius: 8,
      fontSize: "1rem",
      fontWeight: 600,
      cursor: "pointer",
      marginTop: 10,
      transition: "background 0.2s",
      alignSelf: "flex-start",
    },
    saveBtnHover: {
      background: "#22b5a5",
    },
    lastSync: {
      fontSize: "0.92rem",
      color: "#7aafc6",
      marginTop: 10,
    },
  };

  const [btnHover, setBtnHover] = React.useState(false);
  const [saveHover, setSaveHover] = React.useState(false);

  // Sidebar icons data
  const sidebarIcons = [
    { href: "#", src: "icons/KaizenLogo.png", alt: "Logo", isLogo: true },
    { href: "#", src: "icons/home.png", alt: "Home" },
    { href: "#", src: "icons/stats.png", alt: "Analytics" },
    { href: "#", src: "icons/meal.png", alt: "Billing" },
    { href: "#", src: "icons/settings.png", alt: "Settings", active: true },
    { href: "#", src: "icons/logout.png", alt: "Logout", bottom: true },
  ];

  // Settings nav links
  const navLinks = ["Profile", "Account", "Your Plan", "Help"];

  return (
    <div style={styles.container}>
      {/* Sidebar */}
      <div style={styles.sidebar}>
        {sidebarIcons.map(({ href, src, alt, isLogo, active, bottom }, i) => (
          <a
            key={i}
            href={href}
            style={{
              ...styles.iconLink,
              ...(active ? styles.iconLinkActive : {}),
              ...(bottom ? { marginTop: "auto", marginBottom: 10 } : {}),
            }}
            className={active ? "active" : ""}
          >
            <img
              src={src}
              alt={alt}
              style={{
                ...styles.iconImg,
                ...(active ? styles.iconImgActive : {}),
              }}
            />
          </a>
        ))}
      </div>

      {/* Main Panel */}
      <div style={styles.mainPanel}>
        <nav style={styles.settingsNav}>
          <div style={styles.navTitle}>Settings</div>
          {navLinks.map((link) => (
            <button
              key={link}
              style={{
                ...styles.navLink,
                ...(activeNav === link ? styles.navLinkActive : {}),
              }}
              onClick={() => setActiveNav(link)}
              className={activeNav === link ? "active" : ""}
            >
              {link}
            </button>
          ))}
        </nav>

        <div style={styles.settingsContent}>
          {activeNav === "Account" && (
            <div style={styles.settingsCard}>
              <div style={styles.cardTitle}>Account</div>

              <label htmlFor="email" style={styles.label}>
                Email Address
              </label>
              <input
                id="email"
                type="email"
                value="jagjeet@magical.com"
                readOnly
                style={{ ...styles.input, ...styles.inputReadonly }}
              />

              <label htmlFor="password" style={styles.label}>
                Password
              </label>
              <div style={styles.row}>
                <input
                  id="password"
                  type="password"
                  value="********"
                  readOnly
                  style={{ ...styles.input, ...styles.rowInput }}
                />
                <button
                  style={{
                    ...styles.btn,
                    ...(btnHover ? styles.btnHover : {}),
                    marginTop: 0,
                    marginBottom: 0,
                    padding: "8px 16px",
                    fontSize: "0.98rem",
                  }}
                  onMouseEnter={() => setBtnHover(true)}
                  onMouseLeave={() => setBtnHover(false)}
                  onClick={() => alert("Change password clicked")}
                >
                  Change
                </button>
              </div>

              <div style={styles.deviceList}>
                Device Management and Syncing
                <br />
                <span style={styles.deviceListStrong}>
                  You can manage your devices and syncing options here.
                </span>
              </div>

              <div style={styles.row}>
                <input
                  type="text"
                  value="Pixel 5 (ABCD1234)"
                  readOnly
                  style={{ ...styles.input, ...styles.rowInput }}
                />
                <button
                  style={{
                    ...styles.btn,
                    marginTop: 0,
                    marginBottom: 0,
                    padding: "8px 20px",
                  }}
                  onClick={() => alert("Manage device clicked")}
                >
                  Manage
                </button>
              </div>

              <button
                style={{
                  ...styles.saveBtn,
                  ...(saveHover ? styles.saveBtnHover : {}),
                }}
                onMouseEnter={() => setSaveHover(true)}
                onMouseLeave={() => setSaveHover(false)}
                onClick={() => alert("Save clicked")}
              >
                Save
              </button>

              <div style={styles.lastSync}>Last Sync: 2024-03-20 11:45 pm</div>
            </div>
          )}

          {/* You can add other nav content here if needed */}
        </div>
      </div>
    </div>
  );
}
