import React from "react";

export default function FitnessDashboard() {
  const styles = {
    container: {
      display: "flex",
      minHeight: "100vh",
      fontFamily: "'Montserrat', sans-serif",
      background: "#101c1c",
      color: "#e7f6f2",
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
    icon: {
      width: 40,
      height: 40,
      background: "#1d3434",
      borderRadius: 12,
      marginBottom: 10,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      color: "#7ed6c0",
      fontSize: 20,
      cursor: "pointer",
      transition: "background 0.2s",
    },
    mainContent: {
      flex: 1,
      padding: "40px 0 40px 40px",
      display: "flex",
      gap: 30,
    },
    dashboard: {
      flex: 3,
      display: "flex",
      flexDirection: "column",
      gap: 25,
    },
    dashboardHeader: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: 10,
    },
    dashboardHeaderTitle: {
      fontSize: "1.2rem",
      fontWeight: 600,
      margin: 0,
    },
    goal: {
      fontSize: "1rem",
      fontWeight: 400,
      color: "#a0c7c7",
    },
    cardsGrid: {
      display: "grid",
      gridTemplateColumns: "repeat(3, 1fr)",
      gap: 25,
    },
    card: {
      background: "#182828",
      borderRadius: 18,
      padding: "20px 22px",
      minHeight: 130,
      boxShadow: "0 2px 8px rgba(20, 40, 40, 0.05)",
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between",
    },
    label: {
      fontSize: "0.95rem",
      color: "#7ed6c0",
      marginBottom: 6,
      fontWeight: 600,
      display: "flex",
      alignItems: "center",
    },
    veganBadge: {
      background: "#1dbd6b",
      color: "#fff",
      borderRadius: 14,
      padding: "2px 13px",
      fontSize: "0.85rem",
      fontWeight: 600,
      marginLeft: 10,
    },
    ul: {
      margin: "6px 0 0 0",
      paddingLeft: 20,
      fontSize: "0.95rem",
      color: "#b2dfdb",
    },
    calorieBars: {
      marginTop: 13,
    },
    bar: {
      background: "#233c3c",
      borderRadius: 8,
      height: 8,
      marginBottom: 7,
      overflow: "hidden",
      width: "100%",
    },
    barInner: {
      height: "100%",
      borderRadius: 8,
    },
    carbsBar: { background: "#7ed6c0", width: "70%" },
    proteinBar: { background: "#1dbd6b", width: "45%" },
    fatsBar: { background: "#e67e22", width: "20%" },
    btn: {
      background: "#1dbd6b",
      color: "#fff",
      border: "none",
      borderRadius: 10,
      padding: "7px 18px",
      fontSize: "0.95rem",
      fontWeight: 600,
      marginTop: 10,
      cursor: "pointer",
      transition: "background 0.2s",
    },
    btnHover: {
      background: "#16a05b",
    },
    weightProgress: {
      fontSize: "1.1rem",
      marginBottom: 8,
      fontWeight: 600,
    },
    weightChange: {
      color: "#7ed6c0",
      fontSize: "0.98rem",
      marginBottom: 8,
    },
    weightGraph: {
      height: 40,
      margin: "10px 0",
      position: "relative",
      background: "linear-gradient(90deg, #7ed6c0 60%, transparent 100%)",
      borderRadius: 8,
    },
    workoutStatus: {
      background: "#f9ca24",
      color: "#222",
      borderRadius: 8,
      padding: "2px 10px",
      fontSize: "0.85rem",
      fontWeight: 600,
      marginLeft: 10,
    },
    myWorkoutsList: {
      marginTop: 5,
    },
    workoutRow: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: 8,
    },
    editBtn: {
      background: "#233c3c",
      color: "#7ed6c0",
      border: "none",
      borderRadius: 8,
      padding: "3px 11px",
      fontSize: "0.85rem",
      cursor: "pointer",
    },
    deleteBtn: {
      background: "#e74c3c",
      color: "#fff",
      border: "none",
      borderRadius: 8,
      padding: "3px 11px",
      fontSize: "0.85rem",
      cursor: "pointer",
    },
    sidePanel: {
      flex: 1.1,
      background: "#182828",
      borderRadius: 18,
      padding: "25px 20px",
      marginRight: 20,
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      minWidth: 220,
      maxWidth: 260,
      gap: 25,
    },
    profileSection: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      gap: 5,
      marginBottom: 15,
    },
    profilePic: {
      width: 55,
      height: 55,
      borderRadius: "50%",
      backgroundImage: "url('https://randomuser.me/api/portraits/women/44.jpg')",
      backgroundSize: "cover",
      backgroundPosition: "center",
      marginBottom: 5,
    },
    viewProfileBtn: {
      background: "#233c3c",
      color: "#7ed6c0",
      border: "none",
      borderRadius: 8,
      padding: "4px 16px",
      fontSize: "0.92rem",
      cursor: "pointer",
    },
    heartRateSection: {
      width: "100%",
      background: "#142626",
      borderRadius: 12,
      padding: "14px 14px 10px 14px",
      marginBottom: 8,
      display: "flex",
      flexDirection: "column",
      alignItems: "flex-start",
    },
    heartLabel: {
      color: "#7ed6c0",
      fontSize: "0.96rem",
      marginBottom: 4,
    },
    heartRate: {
      color: "#e74c3c",
      fontSize: "2rem",
      fontWeight: 700,
      marginBottom: 5,
    },
    stepsSection: {
      width: "100%",
      background: "#142626",
      borderRadius: 12,
      padding: "14px 14px 10px 14px",
      marginBottom: 8,
      display: "flex",
      flexDirection: "column",
      alignItems: "flex-start",
    },
    stepsLabel: {
      color: "#b2dfdb",
      fontSize: "0.95rem",
      marginBottom: 4,
    },
    stepsCount: {
      fontSize: "1.25rem",
      fontWeight: 600,
      color: "#7ed6c0",
      marginBottom: 5,
    },
    sleepSection: {
      width: "100%",
      background: "#142626",
      borderRadius: 12,
      padding: "14px 14px 10px 14px",
      marginBottom: 8,
      display: "flex",
      flexDirection: "column",
      alignItems: "flex-start",
    },
    sleepLabel: {
      color: "#b2dfdb",
      fontSize: "0.94rem",
      marginBottom: 5,
    },
    sleepHours: {
      fontSize: "1.1rem",
      fontWeight: 600,
      color: "#7ed6c0",
      marginBottom: 5,
    },
    sleepChart: {
      display: "flex",
      alignItems: "flex-end",
      height: 40,
      gap: 4,
      margin: "10px 0",
      width: "100%",
    },
    sleepBarContainer: {
      flex: 1,
      height: "100%",
      display: "flex",
      flexDirection: "column",
      justifyContent: "flex-end",
    },
    sleepBarItem: {
      background: "#7ed6c0",
      borderRadius: 4,
      width: "100%",
    },
    editGoalBtn: {
      background: "#233c3c",
      color: "#7ed6c0",
      border: "none",
      borderRadius: 8,
      padding: "3px 10px",
      fontSize: "0.85rem",
      cursor: "pointer",
      marginTop: 3,
    },
  };

  return (
    <div style={styles.container}>
      {/* Sidebar */}
      <div style={styles.sidebar}>
        {[
          { href: "dashboard.html", alt: "Logo", src: "icons/KaizenLogo.png" },
          { href: "home.html", alt: "Home", src: "icons/home.png" },
          { href: "stats.html", alt: "Analytics", src: "icons/stats.png" },
          { href: "diet.html", alt: "Diet", src: "icons/meal.png" },
          { href: "settings.html", alt: "Settings", src: "icons/settings.png" },
          { href: "logout.html", alt: "Logout", src: "icons/logout.png" },
        ].map(({ href, alt, src }) => (
          <a key={alt} href={href} style={styles.icon}>
            <img src={src} alt={alt} style={{ width: 22, height: 22, objectFit: "contain" }} />
          </a>
        ))}
      </div>

      {/* Main Content */}
      <div style={styles.mainContent}>
        {/* Dashboard */}
        <div style={styles.dashboard}>
          <div style={styles.dashboardHeader}>
            <h2 style={styles.dashboardHeaderTitle}>Welcome, Aditi</h2>
            <div style={styles.goal}>
              Fitness Goal: <b>Build Muscle</b>
            </div>
          </div>
          <div style={styles.cardsGrid}>
            {/* Diet Plan */}
            <div style={styles.card}>
              <div style={styles.label}>
                DIET PLAN
                <span style={styles.veganBadge}>Vegan</span>
              </div>
              <ul style={styles.ul}>
                <li>Breakfast: Oats with almond milk</li>
                <li>Lunch: Grilled Tofu with Pickle</li>
                <li>Evening Snacks: Walnuts and dates</li>
                <li>Dinner: Quinoa with Masala sprouts</li>
              </ul>
              <div style={{ fontSize: 0.95, color: "#b2dfdb", marginTop: 8 }}>
                Calories: 1200/1800
              </div>
            </div>
            {/* Calorie Tracker */}
            <div style={styles.card}>
              <div style={styles.label}>CALORIE TRACKER</div>
              <div style={{ fontSize: 1.1, marginBottom: 8 }}>Calories: 1100/1800</div>
              <div style={styles.calorieBars}>
                <div style={{ fontSize: 0.93 }}>Carbs</div>
                <div style={styles.bar}>
                  <div style={{ ...styles.barInner, ...styles.carbsBar }}></div>
                </div>
                <div style={{ fontSize: 0.93 }}>Proteins</div>
                <div style={styles.bar}>
                  <div style={{ ...styles.barInner, ...styles.proteinBar }}></div>
                </div>
                <div style={{ fontSize: 0.93 }}>Fats</div>
                <div style={styles.bar}>
                  <div style={{ ...styles.barInner, ...styles.fatsBar }}></div>
                </div>
              </div>
              <button style={styles.btn}>Track Calories</button>
            </div>
            {/* Water Tracker */}
            <div style={styles.card}>
              <div style={styles.label}>WATER TRACKER</div>
              <div style={{ fontSize: 1.1, marginBottom: 8 }}>6 glasses</div>
              <div style={styles.waterProgress}>
                <div style={styles.waterProgressInner}></div>
              </div>
              <div style={{ fontSize: 0.93, color: "#b2dfdb" }}>Goal: 8 Glasses</div>
              <button style={styles.editGoalBtn}>Edit Goal</button>
            </div>
            {/* Weight Progress */}
            <div style={styles.card}>
              <div style={styles.label}>WEIGHT PROGRESS</div>
              <div style={styles.weightProgress}>67 kg → 60 kg</div>
              <div style={styles.weightChange}>1.8 kg down in 2 weeks</div>
              <div style={styles.weightGraph}></div>
              <button style={styles.btn}>Log Weight</button>
            </div>
            {/* Today's Workout */}
            <div style={styles.card}>
              <div style={styles.label}>TODAY'S WORKOUT</div>
              <div style={{ fontSize: 1.1, fontWeight: 600 }}>
                FULL BODY HIIT
                <span style={styles.workoutStatus}>PENDING</span>
              </div>
              <div style={{ fontSize: 0.98, margin: "6px 0" }}>
                30 MINS
                <br />
                250 KCAL
              </div>
              <button style={{ ...styles.btn, marginBottom: 7 }}>VIEW WORKOUT</button>
              <button
                style={{ ...styles.btn, background: "#7ed6c0", color: "#182828" }}
              >
                MARK AS COMPLETED
              </button>
            </div>
            {/* My Workouts */}
            <div style={styles.card}>
              <div style={styles.label}>MY WORKOUTS</div>
              <div style={styles.myWorkoutsList}>
                {[
                  { name: "Leg Day", duration: "45 min" },
                  { name: "Back", duration: "35 min" },
                  { name: "Upper Body", duration: "25 min" },
                  { name: "Glutes", duration: "50 min", isDelete: true },
                ].map(({ name, duration, isDelete }, i) => (
                  <div key={i} style={styles.workoutRow}>
                    <span>{name}</span>
                    <span>
                      {duration}{" "}
                      {isDelete ? (
                        <button style={styles.deleteBtn}>Delete</button>
                      ) : (
                        <button style={styles.editBtn}>Edit</button>
                      )}
                    </span>
                  </div>
                ))}
              </div>
              <button style={{ ...styles.btn, marginTop: 12, background: "#e74c3c" }}>
                Delete Workout
              </button>
            </div>
          </div>
        </div>
        {/* Side Panel */}
        <div style={styles.sidePanel}>
          <div style={styles.profileSection}>
            <div style={styles.profilePic}></div>
            <button style={styles.viewProfileBtn}>View Profile</button>
          </div>
          <div style={styles.heartRateSection}>
            <div style={styles.heartLabel}>Heart Rate</div>
            <div style={styles.heartRate}>72 bpm</div>
            <div style={{ fontSize: 0.94, color: "#b2dfdb" }}>Resting</div>
            <button style={{ ...styles.editGoalBtn, marginTop: 8 }}>Sync Device</button>
          </div>
          <div style={styles.stepsSection}>
            <div style={styles.stepsLabel}>Steps</div>
            <div style={styles.stepsCount}>Today: 8001 steps</div>
            <div style={{ fontSize: 0.94, color: "#b2dfdb" }}>Goal: 8 Hours</div>
          </div>
          <div style={styles.sleepSection}>
            <div style={styles.sleepLabel}>Sleep</div>
            <div style={styles.sleepHours}>7 Hr 45 Min</div>
            <div style={styles.sleepChart}>
              {[60, 80, 70, 90, 75, 85, 65].map((height, i) => (
                <div key={i} style={styles.sleepBarContainer}>
                  <div style={{ ...styles.sleepBarItem, height: `${height}%` }}></div>
                </div>
              ))}
            </div>
            <div style={{ fontSize: 0.94, color: "#b2dfdb" }}>Goal: 8 Hours</div>
            <button style={styles.editGoalBtn}>Edit Goal</button>
          </div>
        </div>
      </div>
    </div>
  );
}
