import React, { useState } from 'react';
import backgroundManager from '../assets/backgroundManager.jpg';

const resetQueues = async () => {
  try {
    const response = await fetch('http://localhost:3001/api/service/resetQueues', {
      method: 'DELETE',
      credentials: 'include',
    });
    if (!response.ok) {
      throw new Error('Failed to reset queues');
    }
    return 'Queues reset successfully!';
  } catch (error) {
    return `Error: ${error.message}`;
  }
};

const ManagerHalf = () => {
  return (
    <>
      <img
        src={backgroundManager}
        alt="Background Image"
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100vh',
          objectFit: 'cover',
          zIndex: -1,
        }}
      />
      <ManagerHalfContainer />
    </>
  );
};

const ManagerHalfContainer = () => {
  const [message, setMessage] = useState('');

  const handleResetClick = async () => {
    const resultMessage = await resetQueues();
    setMessage(resultMessage);  
  };

  return (
    <div style={{ padding: '20px', color: '#fff' }}>
      <h1>Manager Dashboard</h1>

      

      <h3>Manage Queues</h3>

      {message && (
        <p style={{ marginTop: '20px', fontSize: '18px' }}>
          {message}
        </p>
      )}

      <div style={{
        position: 'absolute',
        bottom: 0,
        left: 0,
        padding: '20px'
      }}>
        <button 
          onClick={handleResetClick} 
          style={{
            padding: '10px 20px', 
            fontSize: '16px', 
            cursor: 'pointer', 
            backgroundColor: '#007BFF', 
            color: '#fff',
            border: 'none',
            borderRadius: '5px'
          }}
        >
          Reset Queues
        </button>
      </div>
    </div>
  );
};

export default ManagerHalf;
