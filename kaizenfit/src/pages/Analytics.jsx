import React from "react";

// Helper style objects for reuse
const progressBarStyle = {
  height: "9px",
  background: "#1a3a3a",
  borderRadius: "5px",
  marginBottom: "10px",
  overflow: "hidden",
};

const progressFillBase = {
  height: "100%",
  background: "#2acfcf",
  borderRadius: "5px",
};

const buttonBase = {
  background: "#2acfcf",
  color: "#fff",
  border: "none",
  borderRadius: "12px",
  padding: "8px 18px",
  fontSize: "1rem",
  fontWeight: 600,
  cursor: "pointer",
  marginTop: "12px",
};

const buttonOutline = {
  ...buttonBase,
  background: "transparent",
  color: "#2acfcf",
  border: "2px solid #2acfcf",
};

const workoutStatusStyle = {
  background: "#bfa14a",
  color: "#fff",
  borderRadius: "8px",
  padding: "2px 10px",
  fontSize: "0.85rem",
  fontWeight: 700,
  marginLeft: "10px",
};

export default function AnalyticsDashboard() {
  return (
    <div
      style={{
        backgroundColor: "#0e2323",
        margin: 0,
        fontFamily: "'Segoe UI', Arial, sans-serif",
        color: "#fff",
        minHeight: "100vh",
      }}
    >
      <div
        style={{
          display: "flex",
          minHeight: "100vh",
        }}
      >
        {/* Sidebar */}
        <div
          style={{
            width: "70px",
            background: "#132929",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            padding: "24px 0",
            gap: "18px",
            borderRadius: "20px 0 0 20px",
          }}
        >
          {/* Replace src with your icon image paths */}
          <img
            src="icons/KaizenLogo.png"
            alt="Logo"
            style={{
              width: "38px",
              height: "38px",
              margin: "10px 0",
              borderRadius: "12px",
              background: "#193838",
              padding: "7px",
              boxSizing: "border-box",
              transition: "background 0.2s",
              cursor: "pointer",
            }}
            onMouseOver={e => (e.currentTarget.style.background = "#2acfcf")}
            onMouseOut={e => (e.currentTarget.style.background = "#193838")}
          />
          <img
            src="icons/home.png"
            alt="Home"
            style={{
              width: "38px",
              height: "38px",
              margin: "10px 0",
              borderRadius: "12px",
              background: "#193838",
              padding: "7px",
              boxSizing: "border-box",
              transition: "background 0.2s",
              cursor: "pointer",
            }}
            onMouseOver={e => (e.currentTarget.style.background = "#2acfcf")}
            onMouseOut={e => (e.currentTarget.style.background = "#193838")}
          />
          <img
            src="icons/stats.png"
            alt="Analytics"
            style={{
              width: "38px",
              height: "38px",
              margin: "10px 0",
              borderRadius: "12px",
              background: "#193838",
              padding: "7px",
              boxSizing: "border-box",
              transition: "background 0.2s",
              cursor: "pointer",
            }}
            onMouseOver={e => (e.currentTarget.style.background = "#2acfcf")}
            onMouseOut={e => (e.currentTarget.style.background = "#193838")}
          />
          <img
            src="icons/meal.png"
            alt="Diet"
            style={{
              width: "38px",
              height: "38px",
              margin: "10px 0",
              borderRadius: "12px",
              background: "#193838",
              padding: "7px",
              boxSizing: "border-box",
              transition: "background 0.2s",
              cursor: "pointer",
            }}
            onMouseOver={e => (e.currentTarget.style.background = "#2acfcf")}
            onMouseOut={e => (e.currentTarget.style.background = "#193838")}
          />
          <img
            src="icons/settings.png"
            alt="Workout"
            style={{
              width: "38px",
              height: "38px",
              margin: "10px 0",
              borderRadius: "12px",
              background: "#193838",
              padding: "7px",
              boxSizing: "border-box",
              transition: "background 0.2s",
              cursor: "pointer",
            }}
            onMouseOver={e => (e.currentTarget.style.background = "#2acfcf")}
            onMouseOut={e => (e.currentTarget.style.background = "#193838")}
          />
        </div>

        {/* Main Content */}
        <div
          style={{
            flex: 1,
            padding: "40px 32px 32px 32px",
          }}
        >
          <div
            style={{
              fontSize: "2.7rem",
              fontWeight: 800,
              letterSpacing: "1px",
              marginBottom: "30px",
              marginLeft: "10px",
              color: "#eafcfb",
              textShadow: "0 2px 18px #0a2323",
            }}
          >
            Analytics
          </div>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gridAutoRows: "minmax(160px, auto)",
              gap: "24px",
            }}
          >
            {/* 1. Diet Plan Panel */}
            <div
              style={{
                background: "#113131",
                borderRadius: "14px",
                padding: "22px 20px 20px 20px",
                boxShadow: "0 4px 24px rgba(0,0,0,0.15)",
                color: "#fff",
                minHeight: "140px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
              }}
            >
              <div
                style={{
                  fontSize: "1.08rem",
                  fontWeight: 700,
                  color: "#b0c4c4",
                  marginBottom: "10px",
                  letterSpacing: "0.5px",
                }}
              >
                DIET PLAN
              </div>
              <div
                style={{
                  color: "#b0c4c4",
                  fontSize: "1.1rem",
                  textAlign: "center",
                  marginTop: "30px",
                  marginBottom: "30px",
                }}
              >
                Your personalized diet plan will appear here.
              </div>
              <button
                style={{
                  background: "#2acfcf",
                  color: "#fff",
                  border: "none",
                  borderRadius: "12px",
                  padding: "8px 18px",
                  fontSize: "1rem",
                  fontWeight: 600,
                  cursor: "pointer",
                  margin: "0 auto",
                  display: "block",
                  width: "70%",
                }}
              >
                View Diet Plan
              </button>
            </div>

            {/* 2. Calorie Tracker Panel */}
            <div
              style={{
                background: "#113131",
                borderRadius: "14px",
                padding: "22px 20px 20px 20px",
                boxShadow: "0 4px 24px rgba(0,0,0,0.15)",
                color: "#fff",
                minHeight: "140px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
              }}
            >
              <div
                style={{
                  fontSize: "1.08rem",
                  fontWeight: 700,
                  color: "#b0c4c4",
                  marginBottom: "10px",
                  letterSpacing: "0.5px",
                }}
              >
                CALORIE TRACKER
              </div>
              <div>Calories: 1500/2000</div>
              <div style={progressBarStyle}>
                <div style={{ ...progressFillBase, width: "75%" }} />
              </div>
              <div>Protein: 120g</div>
              <div style={progressBarStyle}>
                <div style={{ ...progressFillBase, width: "80%" }} />
              </div>
              <div>Fats: 45g</div>
              <div style={progressBarStyle}>
                <div style={{ ...progressFillBase, width: "50%" }} />
              </div>
              <button style={buttonBase}>Track Calories</button>
            </div>

            {/* 3. Water Tracker Panel */}
            <div
              style={{
                background: "#113131",
                borderRadius: "14px",
                padding: "22px 20px 20px 20px",
                boxShadow: "0 4px 24px rgba(0,0,0,0.15)",
                color: "#fff",
                minHeight: "140px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
              }}
            >
              <div
                style={{
                  fontSize: "1.08rem",
                  fontWeight: 700,
                  color: "#b0c4c4",
                  marginBottom: "10px",
                  letterSpacing: "0.5px",
                }}
              >
                WATER TRACKER
              </div>
              <div style={{ fontSize: "1.2rem" }}>
                6 glasses{" "}
                <span style={{ color: "#b0c4c4" }}>of 8 glasses</span>
              </div>
              <div style={progressBarStyle}>
                <div style={{ ...progressFillBase, width: "75%" }} />
              </div>
              <button style={buttonOutline}>Edit Goal</button>
            </div>

            {/* 4. Weight Progress Panel */}
            <div
              style={{
                background: "#113131",
                borderRadius: "14px",
                padding: "22px 20px 20px 20px",
                boxShadow: "0 4px 24px rgba(0,0,0,0.15)",
                color: "#fff",
                minHeight: "140px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
              }}
            >
              <div
                style={{
                  fontSize: "1.08rem",
                  fontWeight: 700,
                  color: "#b0c4c4",
                  marginBottom: "10px",
                  letterSpacing: "0.5px",
                }}
              >
                WEIGHT PROGRESS
              </div>
              <div
                style={{
                  fontSize: "1.3rem",
                  fontWeight: 600,
                  marginBottom: "5px",
                }}
              >
                67 kg &rarr; 60 kg
              </div>
              <div
                style={{
                  fontSize: "0.98rem",
                  color: "#b0c4c4",
                  marginBottom: "15px",
                }}
              >
                1.8 kg down in 2 weeks
              </div>
              <div
                style={{
                  height: "40px",
                  background:
                    "linear-gradient(90deg, #2acfcf 60%, transparent 100%)",
                  borderRadius: "8px",
                  marginBottom: "14px",
                }}
              ></div>
              <button style={buttonOutline}>Log Weight</button>
            </div>

            {/* 5. Today's Workout Panel */}
            <div
              style={{
                background: "#113131",
                borderRadius: "14px",
                padding: "22px 20px 20px 20px",
                boxShadow: "0 4px 24px rgba(0,0,0,0.15)",
                color: "#fff",
                minHeight: "140px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
              }}
            >
              <div
                style={{
                  fontSize: "1.08rem",
                  fontWeight: 700,
                  color: "#b0c4c4",
                  marginBottom: "10px",
                  letterSpacing: "0.5px",
                }}
              >
                TODAY'S WORKOUT
              </div>
              <div
                style={{
                  fontSize: "1.1rem",
                  fontWeight: 700,
                }}
              >
                FULL BODY HIT{" "}
                <span style={workoutStatusStyle}>ACTIVE</span>
              </div>
              <div style={{ color: "#b0c4c4" }}>
                38 MINS
                <br />
                750 KCAL
              </div>
              <button style={buttonBase}>View Workout</button>
              <button style={buttonOutline}>Mark as Completed</button>
            </div>

            {/* 6. My Workouts Panel */}
            <div
              style={{
                background: "#113131",
                borderRadius: "14px",
                padding: "22px 20px 20px 20px",
                boxShadow: "0 4px 24px rgba(0,0,0,0.15)",
                color: "#fff",
                minHeight: "140px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
              }}
            >
              <div
                style={{
                  fontSize: "1.08rem",
                  fontWeight: 700,
                  color: "#b0c4c4",
                  marginBottom: "10px",
                  letterSpacing: "0.5px",
                }}
              >
                MY WORKOUTS
              </div>
              <div>
                Day One <span style={workoutStatusStyle}>45min</span>
              </div>
              <div>
                Day Two <span style={workoutStatusStyle}>30min</span>
              </div>
              <div>
                Upper Body <span style={workoutStatusStyle}>30min</span>
              </div>
              <div>
                Cardio <span style={workoutStatusStyle}>30min</span>
              </div>
              <button style={buttonBase}>View Workout</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
