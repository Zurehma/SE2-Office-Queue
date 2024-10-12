import React, { useState } from 'react';
import backgroundManager from '../assets/backgroundManager.jpg';

const resetQueues = async () => {
  try {
    const response = await fetch('http://localhost:3001/api/service/resetQueues', {
      method: 'DELETE',
      credentials: 'include',  // This includes the session cookie in the request
    });

    if (!response.ok) {
      throw new Error('Failed to reset queues');
    }

    return 'Queues reset successfully!';
  } catch (error) {
    return `Error: ${error.message}`;
  }
};

// Function to save configuration to the database
const saveConfiguration = async (configuration) => {
  try {
    const response = await fetch('', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify(configuration),
    });

    if (!response.ok) {
      throw new Error('Failed to save configuration');
    }

    return 'Configuration saved successfully!';
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
  const [selectedAccounters, setSelectedAccounters] = useState({
    publicService: 'accounter1',
    moneyTransfer: 'accounter1',
    shippingReceiving: 'accounter1',
  });

  const handleResetClick = async () => {
    const resultMessage = await resetQueues();
    setMessage(resultMessage);

    setTimeout(() => {
      setMessage('');
    }, 5000);
  };

  const handleAccounterChange = (e, service) => {
    setSelectedAccounters({
      ...selectedAccounters,
      [service]: e.target.value,
    });
  };

  const handleConfigureClick = async () => {
    const resultMessage = await saveConfiguration(selectedAccounters);
    setMessage(resultMessage);

    setTimeout(() => {
      setMessage('');
    }, 5000);
  };

  return (
    <div style={{ padding: '20px', color: '#fff' }}>
      <h1>Manager Dashboard</h1>

      <h2>Service Configuration</h2>

      {/* Public Service Dropdown */}
      <div style={{ marginBottom: '20px' }}>
        <label htmlFor="publicServiceSelect" style={{ marginRight: '10px' }}>
          Public Service:
        </label>
        <select
          id="publicServiceSelect"
          value={selectedAccounters.publicService}
          onChange={(e) => handleAccounterChange(e, 'publicService')}
          style={{
            padding: '10px',
            fontSize: '16px',
            backgroundColor: '#f0f0f0',
            border: '1px solid #ccc',
            borderRadius: '5px',
          }}
        >
          <option value="accounter1">Accounter 1</option>
          <option value="accounter2">Accounter 2</option>
        </select>
      </div>

      {/* Money Transfer Dropdown */}
      <div style={{ marginBottom: '20px' }}>
        <label htmlFor="moneyTransferSelect" style={{ marginRight: '10px' }}>
          Money Transfer:
        </label>
        <select
          id="moneyTransferSelect"
          value={selectedAccounters.moneyTransfer}
          onChange={(e) => handleAccounterChange(e, 'moneyTransfer')}
          style={{
            padding: '10px',
            fontSize: '16px',
            backgroundColor: '#f0f0f0',
            border: '1px solid #ccc',
            borderRadius: '5px',
          }}
        >
          <option value="accounter1">Accounter 1</option>
          <option value="accounter2">Accounter 2</option>
        </select>
      </div>

      {/* Shipping and Receiving Dropdown */}
      <div style={{ marginBottom: '20px' }}>
        <label htmlFor="shippingReceivingSelect" style={{ marginRight: '10px' }}>
          Shipping and Receiving:
        </label>
        <select
          id="shippingReceivingSelect"
          value={selectedAccounters.shippingReceiving}
          onChange={(e) => handleAccounterChange(e, 'shippingReceiving')}
          style={{
            padding: '10px',
            fontSize: '16px',
            backgroundColor: '#f0f0f0',
            border: '1px solid #ccc',
            borderRadius: '5px',
          }}
        >
          <option value="accounter1">Accounter 1</option>
          <option value="accounter2">Accounter 2</option>
        </select>
      </div>

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
            borderRadius: '5px',
            marginRight: '10px'
          }}
        >
          Reset Queues
        </button>
        
        <button 
          onClick={handleConfigureClick} 
          style={{
            padding: '10px 20px', 
            fontSize: '16px', 
            cursor: 'pointer', 
            backgroundColor: '#28a745', 
            color: '#fff',
            border: 'none',
            borderRadius: '5px'
          }}
        >
          Configure
        </button>
      </div>
    </div>
  );
};

export default ManagerHalf;
