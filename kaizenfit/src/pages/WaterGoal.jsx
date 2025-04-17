import React, { useState } from 'react';

const WaterGoalModal = () => {
  const [glasses, setGlasses] = useState(2);
  const [volume, setVolume] = useState('250');
  const [isHovered, setIsHovered] = useState(false);

  const styles = {
    modal: {
      background: '#073032',
      borderRadius: '14px',
      width: '320px',
      padding: '28px 22px 22px 22px',
      boxShadow: '0 4px 24px rgba(0,0,0,0.18)',
      position: 'relative',
      fontFamily: 'Montserrat, sans-serif',
      color: '#e7f6f2',
    },
    header: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      fontSize: '1.05rem',
      fontWeight: 600,
      letterSpacing: '1px',
      marginBottom: '18px',
    },
    closeBtn: {
      fontSize: '1.2rem',
      background: 'none',
      border: 'none',
      cursor: 'pointer',
      fontWeight: 700,
      padding: '0 2px',
      transition: 'color 0.2s',
      color: '#e7f6f2',
    },
    currentGoal: {
      fontSize: '0.97rem',
      color: '#a0c7c7',
      marginBottom: '10px',
      fontWeight: 500,
    },
    goalValue: {
      color: '#7ed6c0',
      fontWeight: 600,
      marginLeft: '6px',
    },
    inputGroup: {
      display: 'flex',
      alignItems: 'center',
      background: '#092223',
      borderRadius: '8px',
      overflow: 'hidden',
      height: '38px',
    },
    glassButton: {
      background: 'none',
      border: 'none',
      color: '#7ed6c0',
      fontSize: '1.3rem',
      width: '34px',
      height: '100%',
      cursor: 'pointer',
      fontWeight: 600,
      transition: 'background 0.15s',
    },
    glassInput: {
      width: '34px',
      textAlign: 'center',
      background: 'none',
      border: 'none',
      color: '#e7f6f2',
      fontSize: '1rem',
      fontWeight: 600,
      outline: 'none',
    },
    volumeSelect: {
      background: '#092223',
      color: '#7ed6c0',
      border: 'none',
      borderRadius: '8px',
      fontSize: '1rem',
      padding: '8px 18px 8px 12px',
      marginLeft: '2px',
      fontWeight: 500,
    },
    saveButton: {
      background: isHovered ? '#16a05b' : '#1dbd6b',
      color: '#fff',
      border: 'none',
      borderRadius: '16px',
      padding: '8px 32px',
      fontSize: '1rem',
      fontWeight: 600,
      cursor: 'pointer',
      margin: '12px auto 0',
      display: 'block',
      transition: 'background 0.2s',
    },
  };

  const handleGlassChange = (delta) => {
    setGlasses(prev => Math.max(1, Math.min(prev + delta, 20)));
  };

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: 'rgba(0,0,0,0.5)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1000
    }}>
      <div style={styles.modal}>
        <div style={styles.header}>
          <span>EDIT WATER GOAL</span>
          <button 
            style={styles.closeBtn}
            onMouseEnter={(e) => e.target.style.color = '#e74c3c'}
            onMouseLeave={(e) => e.target.style.color = '#e7f6f2'}
            onClick={() => console.log('Close modal')}
          >
            &times;
          </button>
        </div>

        <div style={styles.currentGoal}>
          Current Water Goal:
          <span style={styles.goalValue}>8 glasses</span>
        </div>

        <label style={{...styles.currentGoal, marginBottom: '5px'}}>New Water Goal:</label>
        
        <div style={{display: 'flex', alignItems: 'center', gap: '10px', margin: '16px 0 24px'}}>
          <div style={styles.inputGroup}>
            <button 
              style={styles.glassButton}
              onClick={() => handleGlassChange(-1)}
              onMouseEnter={(e) => e.target.style.background = '#174243'}
              onMouseLeave={(e) => e.target.style.background = 'none'}
            >
              –
            </button>
            <input
              type="text"
              value={glasses}
              readOnly
              style={styles.glassInput}
            />
            <button 
              style={styles.glassButton}
              onClick={() => handleGlassChange(1)}
              onMouseEnter={(e) => e.target.style.background = '#174243'}
              onMouseLeave={(e) => e.target.style.background = 'none'}
            >
              +
            </button>
          </div>
          
          <span style={{color: '#b2dfdb', fontSize: '0.95rem'}}>glasses</span>
          
          <select 
            style={styles.volumeSelect}
            value={volume}
            onChange={(e) => setVolume(e.target.value)}
          >
            <option value="250">250</option>
            <option value="200">200</option>
            <option value="300">300</option>
          </select>
          
          <span style={{color: '#b2dfdb', fontSize: '0.95rem'}}>ml</span>
        </div>

        <button 
          style={styles.saveButton}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          onClick={() => console.log('Save goal', { glasses, volume })}
        >
          Save Goal
        </button>
      </div>
    </div>
  );
};

export default WaterGoalModal;
