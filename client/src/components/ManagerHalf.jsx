import React, { useState } from 'react';
import backgroundManager from '../assets/backgroundManager.jpg';

// Function to reset the queues
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

// Function to save service-to-counter relationships to the database
const saveServicesForCounters = async (counterServices) => {
  try {
    const response = await fetch('http://localhost:3001/api/counter/configuration', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify(counterServices),
    });

    if (!response.ok) {
      throw new Error('Failed to save counter services');
    }

    return 'Counter services saved successfully!';
  } catch (error) {
    return `Error: ${error.message}`;
  }
};

// Function to delete the counter configuration
const deleteCounterConfiguration = async () => {
  try {
    const response = await fetch('http://localhost:3001/api/counter/configuration', {
      method: 'DELETE',
      credentials: 'include',
    });

    if (!response.ok) {
      if (response.status === 400) {
        throw new Error('No configuration available'); // Specific error for 400 status
      }
      throw new Error('Failed to delete configuration');
    }

    return 'Configuration deleted successfully!';
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
  const [counterServices, setCounterServices] = useState({
    accounter1: [],
    accounter2: [],
  });

  const services = [
    { id: 1, name: 'Public Service' },
    { id: 2, name: 'Money Transfer' },
    { id: 3, name: 'Shipping and Receiving' },
  ];

  const handleServiceSelection = (accounter, serviceId) => {
    setCounterServices((prev) => {
      const updatedServices = prev[accounter].includes(serviceId)
        ? prev[accounter].filter((id) => id !== serviceId)
        : [...prev[accounter], serviceId];

      return {
        ...prev,
        [accounter]: updatedServices,
      };
    });
  };

  const handleResetClick = async () => {
    const resultMessage = await resetQueues();
    setMessage(resultMessage);

    setTimeout(() => {
      setMessage('');
    }, 5000);
  };

  const handleConfigureClick = async () => {
    // Format the data for saving
    const formattedData = Object.entries(counterServices).flatMap(([accounter, services]) => 
      services.map(serviceId => ({
        accounterId: accounter === 'accounter1' ? 2 : 3, // IDs for Accounter 1 and Accounter 2
        serviceId
      }))
    );

    const resultMessage = await saveServicesForCounters(formattedData);
    setMessage(resultMessage);

    setTimeout(() => {
      setMessage('');
    }, 5000);
  };

  const handleDeleteConfigurationClick = async () => {
    const resultMessage = await deleteCounterConfiguration();
    setMessage(resultMessage);

    setTimeout(() => {
      setMessage('');
    }, 5000);
  };

  return (
    <div style={{ padding: '20px', color: '#fff' }}>
      <h1>Manager Dashboard</h1>

      <h2>Assign Services to Counters</h2>

      {/* Accounter 1 */}
      <div style={{ marginBottom: '20px' }}>
        <h3>Accounter 1 (ID: 2)</h3>
        {services.map((service) => (
          <label key={service.id} style={{ display: 'block', marginBottom: '10px' }}>
            <input
              type="checkbox"
              checked={counterServices.accounter1.includes(service.id)}
              onChange={() => handleServiceSelection('accounter1', service.id)}
            />
            {service.name}
          </label>
        ))}
      </div>

      {/* Accounter 2 */}
      <div style={{ marginBottom: '20px' }}>
        <h3>Accounter 2 (ID: 3)</h3>
        {services.map((service) => (
          <label key={service.id} style={{ display: 'block', marginBottom: '10px' }}>
            <input
              type="checkbox"
              checked={counterServices.accounter2.includes(service.id)}
              onChange={() => handleServiceSelection('accounter2', service.id)}
            />
            {service.name}
          </label>
        ))}
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
            borderRadius: '5px',
            marginRight: '10px'
          }}
        >
          Save Configuration
        </button>

        <button 
          onClick={handleDeleteConfigurationClick} 
          style={{
            padding: '10px 20px', 
            fontSize: '16px', 
            cursor: 'pointer', 
            backgroundColor: '#dc3545', 
            color: '#fff',
            border: 'none',
            borderRadius: '5px'
          }}
        >
          Delete Configuration
        </button>
      </div>
    </div>
  );
};

export default ManagerHalf;
