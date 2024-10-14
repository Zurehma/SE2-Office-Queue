import React from 'react';

const Board = ({ currentCustomer }) => {
  return (
    <div className="d-flex align-items-center justify-content-center" style={{ height: '100%', width: '100%' }}>
      <div className="info-container text-center" style={{ backgroundColor: 'rgba(0, 0, 0, 0.6)', padding: '20px', borderRadius: '10px', maxWidth: '80%' }}>
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


