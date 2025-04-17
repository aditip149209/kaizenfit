import React from "react";

export default function TrackCalories() {
  const styles = {
    container: {
      display: "flex",
      minHeight: "100vh",
      alignItems: "flex-start",
      justifyContent: "flex-start",
      fontFamily: "'Montserrat', sans-serif",
      background: "#07191a",
      color: "#e7f6f2",
      margin: 0,
    },
    sidebar: {
      background: "#142626",
      width: 80,
      minWidth: 80,
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      padding: "24px 0",
      gap: 16,
      borderTopLeftRadius: 20,
      borderBottomLeftRadius: 20,
      height: "100vh",
    },
    sidebarLink: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      width: 48,
      height: 48,
      background: "#1d3434",
      borderRadius: 12,
      marginBottom: 10,
      transition: "background 0.2s",
      textDecoration: "none",
      cursor: "pointer",
    },
    sidebarLinkHover: {
      background: "#7ed6c0",
    },
    sidebarImg: {
      width: 28,
      height: 28,
      objectFit: "contain",
      display: "block",
      filter: "brightness(0.95)",
    },
    mainContent: {
      flex: 1,
      padding: "32px 0 32px 32px",
      display: "flex",
      flexDirection: "column",
      alignItems: "flex-start",
    },
    caloriesCard: {
      background: "#0c2324",
      borderRadius: 20,
      padding: "32px 32px 24px 32px",
      width: 700,
      boxShadow: "0 2px 16px rgba(0,0,0,0.09)",
      display: "flex",
      flexDirection: "column",
      gap: 16,
    },
    caloriesHeaderRow: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      marginBottom: 8,
    },
    caloriesTitle: {
      fontSize: "1.13rem",
      fontWeight: 600,
      letterSpacing: "0.5px",
    },
    caloriesTip: {
      fontSize: "0.92rem",
      color: "#a0c7c7",
      letterSpacing: "0.2px",
      marginLeft: 24,
      flex: 1,
    },
    caloriesLeftCircle: {
      border: "1.5px solid #7ed6c0",
      borderRadius: "50%",
      width: 70,
      height: 70,
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      color: "#e7f6f2",
      fontSize: "1.05rem",
      fontWeight: 500,
      position: "relative",
    },
    caloriesLeftSpan: {
      fontSize: "1.2rem",
      fontWeight: 600,
      color: "#7ed6c0",
      marginBottom: 3,
    },
    divider: {
      border: "none",
      borderTop: "1px solid #183031",
      margin: "8px 0 0 0",
    },
    dateRow: {
      textAlign: "center",
      color: "#b2dfdb",
      letterSpacing: 1,
      fontSize: "0.98rem",
      margin: "10px 0 0 0",
      fontWeight: 500,
    },
    mealsRow: {
      display: "flex",
      gap: 24,
      margin: "18px 0 0 0",
      justifyContent: "space-between",
      width: "100%",
    },
    mealCard: {
      background: "#113131",
      borderRadius: 16,
      flex: 1,
      padding: "18px 10px 18px 18px",
      minWidth: 120,
      display: "flex",
      flexDirection: "column",
      alignItems: "flex-start",
      marginRight: 0,
      boxShadow: "0 2px 6px rgba(0,0,0,0.06)",
    },
    mealTitle: {
      fontSize: "1.05rem",
      fontWeight: 600,
      color: "#e7f6f2",
      marginBottom: 10,
      letterSpacing: "0.5px",
    },
    mealNutrients: {
      display: "flex",
      flexDirection: "column",
      gap: 7,
      marginTop: 5,
      width: "100%",
    },
    nutrientRow: {
      display: "flex",
      alignItems: "center",
      gap: 7,
      fontSize: "0.96rem",
      color: "#b2dfdb",
      fontWeight: 500,
    },
    nutrientIcon: {
      fontSize: "1.1em",
    },
    actionsRow: {
      display: "flex",
      gap: 24,
      marginTop: 28,
      justifyContent: "flex-start",
      width: "100%",
    },
    actionBtn: {
      flex: 1,
      display: "flex",
      alignItems: "center",
      background: "none",
      border: "1px solid #7ed6c0",
      color: "#e7f6f2",
      borderRadius: 30,
      padding: "10px 18px",
      fontSize: "1rem",
      fontWeight: 500,
      cursor: "pointer",
      transition: "background 0.18s, color 0.18s",
      textDecoration: "none",
      justifyContent: "center",
      gap: 10,
    },
    actionBtnHover: {
      background: "#7ed6c0",
      color: "#182828",
    },
    iconSpan: {
      fontSize: "1.15em",
      marginRight: 6,
    },
  };

  return (
    <div style={styles.container}>
      {/* Sidebar */}
      <div style={styles.sidebar}>
        {[
          { href: "dashboard.html", src: "icons/KaizenLogo.png", alt: "Logo" },
          { href: "home.html", src: "icons/home.png", alt: "Home" },
          { href: "stats.html", src: "icons/stats.png", alt: "Stats" },
          { href: "meals.html", src: "icons/meal.png", alt: "Meals" },
          { href: "settings.html", src: "icons/settings.png", alt: "Settings" },
          { href: "logout.html", src: "icons/logout.png", alt: "Logout" },
        ].map(({ href, src, alt }) => (
          <a key={alt} href={href} style={styles.sidebarLink}>
            <img src={src} alt={alt} style={styles.sidebarImg} />
          </a>
        ))}
      </div>

      {/* Main Content */}
      <div style={styles.mainContent}>
        <div style={styles.caloriesCard}>
          <div style={styles.caloriesHeaderRow}>
            <div style={styles.caloriesTitle}>TRACK CALORIES</div>
            <div style={styles.caloriesTip}>AIM TO STAY WITHIN YOUR SWEET SPOT</div>
            <div style={styles.caloriesLeftCircle}>
              <span style={styles.caloriesLeftSpan}>1230</span>
              Cals Left
            </div>
          </div>
          <hr style={styles.divider} />
          <div style={styles.dateRow}>
            TODAY, 6TH DEC &nbsp; &#8250;
          </div>
          <div style={styles.mealsRow}>
            {["Breakfast", "Lunch", "Snacks", "Dinner"].map((meal) => (
              <div key={meal} style={styles.mealCard}>
                <div style={styles.mealTitle}>{meal}</div>
                <div style={styles.mealNutrients}>
                  <div style={styles.nutrientRow}><span style={styles.nutrientIcon}>🌾</span> Carbs</div>
                  <div style={styles.nutrientRow}><span style={styles.nutrientIcon}>🥚</span> Proteins</div>
                  <div style={styles.nutrientRow}><span style={styles.nutrientIcon}>💧</span> Fats</div>
                </div>
              </div>
            ))}
          </div>
          <div style={styles.actionsRow}>
            <a href="#" style={styles.actionBtn}>
              <span style={styles.iconSpan}>📖</span> My Recipes
            </a>
            <a href="#" style={styles.actionBtn}>
              <span style={styles.iconSpan}>🍽️</span> My Meals
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
