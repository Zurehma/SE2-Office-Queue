import React, { useState, useEffect } from 'react';
import API from '../../Api.js'; // Assicurati di avere il corretto import dell'API

const Board = ({ currentCustomer }) => {
  const [counterInfo, setCounterInfo] = useState('');
  const [error, setError] = useState('');

  const fetchCounterData = async () => {
    try {
      const userInfo = await API.getUserInfo(); // Chiamata API per ottenere informazioni sull'utente

      if (userInfo.username === 'manager1') {
        setCounterInfo(2);
      } else if (userInfo.username === 'manager2') {
        setCounterInfo(3);
      } else {
        setCounterInfo('unknown');
      }
    } catch (error) {
      setCounterInfo('NOT SELECTED');
    }
  };

  useEffect(() => {
    fetchCounterData(); // Chiama la funzione quando il componente viene montato
  }, []); // Il secondo parametro vuoto [] assicura che venga chiamata solo al montaggio del componente

  return (
    <div className="d-flex align-items-center justify-content-center" style={{ height: '100%', width: '100%', flexDirection: 'column' }}>
      
      {/* Contenitore del contatore */}
      <div className="counter-info-container text-center" style={{ backgroundColor: 'rgba(0, 0, 0, 0.8)', padding: '20px', borderRadius: '10px', marginBottom: '20px', width: '60%' }}>
        <h3 style={{ color: 'white', fontWeight: 'bold', fontSize: '2.5rem' }}>
          COUNTER {counterInfo}
        </h3>
      </div>

      {/* Contenitore delle informazioni del biglietto */}
      <div className="info-container text-center" style={{ backgroundColor: 'rgba(0, 0, 0, 0.6)', padding: '20px', borderRadius: '10px', width: '80%' }}>
        <h2 style={{ color: 'white', fontWeight: 'bold', fontSize: '3rem' }}>
          Last Ticket Called
        </h2>

        <p style={{ color: 'white', fontSize: '2rem' }}>
          {currentCustomer ? `Ticket Number: ${currentCustomer.ticket}` : 'No ticket called yet'}
        </p>
      </div>
    </div>
  );
};

export default Board;
