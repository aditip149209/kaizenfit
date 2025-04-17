import React from 'react';

const ManageDevices = () => {
  const styles = {
    body: {
      margin: 0,
      fontFamily: "'Segoe UI', Arial, sans-serif",
      backgroundColor: '#092923',
      minHeight: '100vh',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    },
    modal: {
      background: '#07302c',
      color: '#d6f5f0',
      width: '370px',
      borderRadius: '10px',
      boxShadow: '0 4px 24px rgba(0,0,0,0.3)',
      padding: '28px 26px 20px 26px',
      position: 'relative',
    },
    header: {
      position: 'absolute',
      top: '16px',
      right: '18px',
      fontSize: '1.2rem',
      color: '#d6f5f0',
      cursor: 'pointer',
    },
    title: {
      marginTop: 0,
      fontSize: '1.1rem',
      fontWeight: 500,
      letterSpacing: '1px',
      textAlign: 'center',
      marginBottom: '28px',
    },
    deviceRow: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: '16px',
      fontSize: '1rem',
      color: '#b2ccc7',
    },
    logoutBtn: {
      background: '#a12a2a',
      color: '#fff',
      border: 'none',
      borderRadius: '18px',
      padding: '6px 18px',
      fontSize: '0.97rem',
      fontWeight: 500,
      cursor: 'pointer',
      transition: 'background 0.2s',
    },
    logoutBtnHover: {
      background: '#7b1d1d',
    },
    hr: {
      border: 'none',
      borderTop: '1px solid #224b41',
      margin: '18px 0',
    },
    saveBtn: {
      display: 'block',
      margin: '0 auto',
      background: '#219488',
      color: '#fff',
      border: 'none',
      borderRadius: '7px',
      padding: '7px 28px',
      fontSize: '1rem',
      fontWeight: 500,
      cursor: 'pointer',
      transition: 'background 0.2s',
    },
    saveBtnHover: {
      background: '#176e65',
    },
  };

  // For hover effect on Save button
  const [hover, setHover] = React.useState(false);
  // For hover effect on Logout buttons
  const [hoverLogoutIndex, setHoverLogoutIndex] = React.useState(null);

  const handleLogoutHover = (index, isHovering) => {
    setHoverLogoutIndex(isHovering ? index : null);
  };

  return (
    <div style={styles.body}>
      <div style={styles.modal}>
        {/* Close button (can be wired up) */}
        <div
          style={styles.header}
          onClick={() => alert('Close clicked!')}
        >
          &times;
        </div>
        <h2 style={styles.title}>MANAGE DEVICES</h2>
        {/* Device rows */}
        {[
          { name: 'Chrome[Linux]' },
          { name: 'Mozilla Firefox(Windows)' },
          { name: 'I Pad Air 10th Gen(Safari)' },
        ].map((device, index) => (
          <div key={index} style={styles.deviceRow}>
            <span>{device.name}</span>
            <button
              style={{
                ...styles.logoutBtn,
                background:
                  hoverLogoutIndex === index
                    ? '#7b1d1d'
                    : styles.logoutBtn.background,
              }}
              onMouseEnter={() => handleLogoutHover(index, true)}
              onMouseLeave={() => handleLogoutHover(index, false)}
              onClick={() => alert(`Logged out from ${device.name}`)}
            >
              Log out
            </button>
          </div>
        ))}
        <hr style={styles.hr} />
        {/* Save Button */}
        <button
          style={{
            ...styles.saveBtn,
            background: hover ? '#176e65' : styles.saveBtn.background,
          }}
          onMouseEnter={() => setHover(true)}
          onMouseLeave={() => setHover(false)}
          onClick={() => alert('Saved!')}
        >
          Save
        </button>
      </div>
    </div>
  );
};

export default ManageDevices;
