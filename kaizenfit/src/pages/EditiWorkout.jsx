import React, { useState } from "react";

export default function EditWorkoutModal({
  initialName = "EVENING CORE BLAST",
  initialExercises = [
    { name: "Pushups", sets: 3, reps: "15" },
    { name: "Donkey Kicks", sets: 4, reps: "15" },
    { name: "Low Plank", sets: 5, reps: "30 sec" },
  ],
  onClose = () => alert("Close clicked!"),
  onSave = (workout) => alert("Workout saved!"),
}) {
  const [workoutName, setWorkoutName] = useState(initialName);
  const [exercises, setExercises] = useState(initialExercises);
  const [saveHover, setSaveHover] = useState(false);

  const handleExerciseChange = (idx, field, value) => {
    setExercises((prev) =>
      prev.map((ex, i) =>
        i === idx ? { ...ex, [field]: field === "sets" ? Number(value) : value } : ex
      )
    );
  };

  const handleAddExercise = () => {
    setExercises([...exercises, { name: "", sets: 1, reps: "" }]);
  };

  const handleSave = (e) => {
    e.preventDefault();
    onSave({ name: workoutName, exercises });
  };

  return (
    <div
      style={{
        background: "#181f1f",
        margin: 0,
        minHeight: "100vh",
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "'Segoe UI', Arial, sans-serif",
      }}
    >
      <div
        style={{
          background: "#073333",
          borderRadius: 14,
          width: 370,
          padding: "32px 28px 28px 28px",
          boxShadow: "0 4px 24px rgba(0,0,0,0.22)",
          color: "#fff",
          position: "relative",
        }}
      >
        <button
          className="close-btn"
          title="Close"
          style={{
            position: "absolute",
            right: 18,
            top: 18,
            fontSize: "1.18rem",
            color: "#b0b0b0",
            background: "none",
            border: "none",
            cursor: "pointer",
            lineHeight: 1,
          }}
          onClick={onClose}
        >
          &times;
        </button>
        <h2
          style={{
            margin: "0 0 24px 0",
            fontSize: "1.18rem",
            fontWeight: 600,
            textAlign: "center",
            letterSpacing: "1px",
          }}
        >
          CREATE/EDIT WORKOUT
        </h2>
        <form onSubmit={handleSave}>
          <label
            className="label"
            htmlFor="workout-name"
            style={{
              display: "block",
              fontSize: "1rem",
              marginBottom: 8,
              color: "#b0c4c4",
              fontWeight: 500,
              letterSpacing: "0.5px",
            }}
          >
            WORKOUT NAME
          </label>
          <input
            className="input-field"
            type="text"
            id="workout-name"
            value={workoutName}
            onChange={(e) => setWorkoutName(e.target.value)}
            style={{
              width: "100%",
              padding: "10px 12px",
              borderRadius: 10,
              border: "none",
              background: "#0e2323",
              color: "#fff",
              fontSize: "1rem",
              marginBottom: 18,
              outline: "none",
              boxSizing: "border-box",
            }}
          />

          <table
            className="exercise-table"
            style={{
              width: "100%",
              borderCollapse: "collapse",
              marginBottom: 12,
            }}
          >
            <thead>
              <tr>
                <th
                  style={{
                    color: "#b0c4c4",
                    fontWeight: 500,
                    letterSpacing: "0.5px",
                    borderBottom: "1px solid #1a3a3a",
                    textAlign: "left",
                    padding: "7px 6px",
                    fontSize: "0.98rem",
                  }}
                >
                  EXERCISE NAME
                </th>
                <th
                  style={{
                    color: "#b0c4c4",
                    fontWeight: 500,
                    letterSpacing: "0.5px",
                    borderBottom: "1px solid #1a3a3a",
                    textAlign: "left",
                    padding: "7px 6px",
                    fontSize: "0.98rem",
                  }}
                >
                  SETS
                </th>
                <th
                  style={{
                    color: "#b0c4c4",
                    fontWeight: 500,
                    letterSpacing: "0.5px",
                    borderBottom: "1px solid #1a3a3a",
                    textAlign: "left",
                    padding: "7px 6px",
                    fontSize: "0.98rem",
                  }}
                >
                  REPS
                </th>
              </tr>
            </thead>
            <tbody>
              {exercises.map((ex, idx) => (
                <tr key={idx}>
                  <td style={{ paddingBottom: 5 }}>
                    <input
                      className="exercise-input"
                      type="text"
                      value={ex.name}
                      onChange={(e) =>
                        handleExerciseChange(idx, "name", e.target.value)
                      }
                      style={{
                        background: "#0e2323",
                        border: "none",
                        borderRadius: 8,
                        color: "#fff",
                        padding: "7px 8px",
                        fontSize: "1rem",
                        width: "90%",
                        outline: "none",
                      }}
                    />
                  </td>
                  <td style={{ paddingBottom: 5 }}>
                    <input
                      className="exercise-input"
                      type="number"
                      min={1}
                      value={ex.sets}
                      onChange={(e) =>
                        handleExerciseChange(idx, "sets", e.target.value)
                      }
                      style={{
                        background: "#0e2323",
                        border: "none",
                        borderRadius: 8,
                        color: "#fff",
                        padding: "7px 8px",
                        fontSize: "1rem",
                        width: "90%",
                        outline: "none",
                      }}
                    />
                  </td>
                  <td style={{ paddingBottom: 5 }}>
                    <input
                      className="exercise-input"
                      type="text"
                      value={ex.reps}
                      onChange={(e) =>
                        handleExerciseChange(idx, "reps", e.target.value)
                      }
                      style={{
                        background: "#0e2323",
                        border: "none",
                        borderRadius: 8,
                        color: "#fff",
                        padding: "7px 8px",
                        fontSize: "1rem",
                        width: "90%",
                        outline: "none",
                      }}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <button
            type="button"
            className="add-exercise"
            onClick={handleAddExercise}
            style={{
              color: "#2acfcf",
              fontSize: "1rem",
              cursor: "pointer",
              marginTop: 8,
              marginBottom: 14,
              display: "inline-block",
              border: "none",
              background: "none",
              padding: 0,
            }}
          >
            + Add Exercise
          </button>
          <hr
            style={{
              border: "none",
              borderTop: "1px solid #1a3a3a",
              margin: "18px 0 22px 0",
            }}
          />
          <button
            type="submit"
            className="save-btn"
            style={{
              width: "80%",
              display: "block",
              margin: "0 auto",
              padding: "10px 0",
              background: saveHover ? "#1fa0a0" : "#2acfcf",
              color: "#fff",
              border: "none",
              borderRadius: 10,
              fontSize: "1rem",
              fontWeight: 600,
              cursor: "pointer",
              transition: "background 0.2s",
              letterSpacing: "0.5px",
            }}
            onMouseEnter={() => setSaveHover(true)}
            onMouseLeave={() => setSaveHover(false)}
          >
            SAVE WORKOUT
          </button>
        </form>
      </div>
    </div>
  );
}
