import React, { useState, useEffect } from 'react';
import QRCode from 'react-qr-code';

const CustomerHalf = () => {
  const [ticketNumber, setTicketNumber] = useState('');
  const [estimatedTime, setEstimatedTime] = useState('');

  useEffect(() => {
    // Simulate data loading with hardcoded values
    const fakeData = {
      ticketNumber: 'A124',
      estimatedTime: '14'
    };

    setTicketNumber(fakeData.ticketNumber);
    setEstimatedTime(fakeData.estimatedTime);
  }, []);

  return (
    <div className="container vh-100 d-flex align-items-center justify-content-center">
      <div className="row w-100">
        {/* Left Column: QR Code */}
        <div className="col-md-6 d-flex justify-content-center align-items-center">
          <div className="qr-code-container">
            <QRCode value={ticketNumber} />
          </div>
        </div>

        <div className="col-md-6 d-flex justify-content-center align-items-center">
          <div className="info-container text-center">
            <h2 style={{ color: 'white', fontWeight: 'bold', fontSize: '3rem' }}> {/* Adjusted font size */}
              Your Ticket: {ticketNumber}
            </h2>
            <p 
              className={estimatedTime > 15 ? 'text-danger' : 'text-white'}
              style={{ fontWeight: 'bold' }} // Make the estimated time text bold
            >
              Estimated waiting time: {estimatedTime} minutes
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerHalf;