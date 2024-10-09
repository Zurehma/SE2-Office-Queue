import React, { useState, useEffect } from 'react';
import QRCode from 'react-qr-code';

const CustomerHalf = () => {
  const [ticketNumber, setTicketNumber] = useState('');
  const [estimatedTime, setEstimatedTime] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchTicketData = async () => {
      try {
        const response = await fetch('http://localhost:3001/api/service/ticket', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ service: 'shipping and RECEIVING' }),
        });

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const data = await response.json();

        setTicketNumber(data.ticketNumber);
        setEstimatedTime(data.estimatedTime);
      } catch (error) {
        console.error('Error fetching ticket data:', error);
        setError('Failed to fetch ticket data');
      } finally {
        setLoading(false); 
      }
    };

    fetchTicketData();
  }, []);

  if (loading) {
    return <div style={{ color: 'white' }}>Loading...</div>;
  }

  if (error) {
    return <div style={{ color: 'red' }}>{error}</div>; 
  }
  

  return (
    <div className="container vh-100 d-flex align-items-center justify-content-center">
      <div className="row w-100">
        <div className="col-md-6 d-flex flex-column justify-content-center align-items-center">
          <div className="info-container text-center">
            <h2 style={{ color: 'white', fontWeight: 'bold', fontSize: '3rem' }}>
              Your Ticket: {ticketNumber}
            </h2>
            <p
              className={estimatedTime > 15 ? 'text-danger' : 'text-white'}
              style={{ fontWeight: 'bold' }}
            >
              Estimated waiting time: {estimatedTime} minutes
            </p>
            <div className="qr-code-container">
              <QRCode value={ticketNumber} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerHalf;
