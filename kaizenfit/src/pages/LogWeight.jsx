import React from 'react';

export const LogWeightModal = () => {
  const styles = {
    body: {
      fontFamily: "'Montserrat', sans-serif",
      backgroundColor: 'rgba(16, 28, 28, 0.9)',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh',
    },
    container: {
      width: '320px',
      backgroundColor: '#0c2627',
      borderRadius: '16px',
      padding: '24px',
      color: '#e7f6f2',
      boxShadow: '0 8px 24px rgba(0, 0, 0, 0.2)',
    },
    header: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: '24px',
    },
    title: {
      fontSize: '16px',
      fontWeight: 500,
      letterSpacing: '0.5px',
    },
    closeBtn: {
      fontSize: '20px',
      color: '#e7f6f2',
      background: 'none',
      border: 'none',
      cursor: 'pointer',
    },
    formGroup: {
      marginBottom: '16px',
    },
    label: {
      display: 'block',
      fontSize: '14px',
      color: '#a0c7c7',
      marginBottom: '8px',
    },
    dateInputContainer: {
      position: 'relative',
    },
    dateInput: {
      width: '100%',
      padding: '12px',
      backgroundColor: '#0a1f20',
      border: 'none',
      borderRadius: '8px',
      color: '#e7f6f2',
      fontFamily: "'Montserrat', sans-serif",
      fontSize: '14px',
    },
    calendarIcon: {
      position: 'absolute',
      right: '12px',
      top: '50%',
      transform: 'translateY(-50%)',
      width: '20px',
      height: '20px',
      pointerEvents: 'none',
    },
    weightContainer: {
      display: 'flex',
      marginBottom: '16px',
    },
    weightInput: {
      flex: 1,
      padding: '12px',
      backgroundColor: '#0a1f20',
      border: 'none',
      borderTopLeftRadius: '8px',
      borderBottomLeftRadius: '8px',
      color: '#e7f6f2',
      fontFamily: "'Montserrat', sans-serif",
      fontSize: '14px',
    },
    unitSelector: {
      width: '60px',
      backgroundColor: '#0a1f20',
      border: 'none',
      borderTopRightRadius: '8px',
      borderBottomRightRadius: '8px',
      color: '#7ed6c0',
      fontFamily: "'Montserrat', sans-serif",
      fontSize: '14px',
      padding: '0 12px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      cursor: 'pointer',
    },
    textarea: {
      width: '100%',
      padding: '12px',
      backgroundColor: '#0a1f20',
      border: 'none',
      borderRadius: '8px',
      color: '#e7f6f2',
      fontFamily: "'Montserrat', sans-serif",
      fontSize: '14px',
      resize: 'none',
      height: '80px',
      marginBottom: '16px',
    },
    saveButton: {
      width: '100px',
      padding: '10px 0',
      backgroundColor: '#1dbd6b',
      color: 'white',
      border: 'none',
      borderRadius: '20px',
      fontFamily: "'Montserrat', sans-serif",
      fontWeight: 500,
      fontSize: '14px',
      cursor: 'pointer',
      margin: '8px auto 0',
      display: 'block',
    },
  };

  return (
    <div style={styles.body}>
      <div style={styles.container}>
        {/* Header */}
        <div style={styles.header}>
          <div style={styles.title}>LOG WEIGHT</div>
          <button style={styles.closeBtn}>&times;</button>
        </div>
        {/* Form */}
        <form>
          {/* Date */}
          <div style={styles.formGroup}>
            <label style={styles.label} htmlFor="date">Date</label>
            <div style={styles.dateInputContainer}>
              <input type="date" id="date" style={styles.dateInput} required />
              {/* Calendar icon SVG */}
              <svg
                style={styles.calendarIcon}
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="#7ed6c0"
              >
                <path d="M19 4h-1V2h-2v2H8V2H6v2H5c-1.11 0-1.99.9-1.99 2L3 20a2 2 0 002 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H5V10h14v10zM9 14H7v-2h2v2zm4 0h-2v-2h2v2zm4 0h-2v-2h2v2z" />
              </svg>
            </div>
          </div>
          {/* Weight */}
          <div style={styles.formGroup}>
            <label style={styles.label} htmlFor="weight">Weight</label>
            <div style={styles.weightContainer}>
              <input
                type="number"
                id="weight"
                step="0.1"
                min="0"
                style={styles.weightInput}
              />
              <div style={styles.unitSelector}>
                <span>Lb</span>
                <span style={{ fontSize: '10px' }}>▼</span>
              </div>
            </div>
          </div>
          {/* Notes */}
          <div style={styles.formGroup}>
            <label style={styles.label} htmlFor="notes">Notes</label>
            <textarea id="notes" style={styles.textarea}></textarea>
          </div>
          {/* Save Button */}
          <button type="submit" style={styles.saveButton}>Save</button>
        </form>
      </div>
    </div>
  );
};

export default LogWeightModal;
