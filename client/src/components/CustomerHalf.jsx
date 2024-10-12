import React, { useState, useEffect } from 'react';
import QRCode from 'react-qr-code';
import backgroundImage from '../assets/backgroundCustomer.jpg'; 
import '../styles.css'

const CustomerHalf = (props) => {
  return (
    <>
      <img
        src={backgroundImage}
        alt="Background Image"
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100vh',
          objectFit: 'cover',
          zIndex: -1
        }}
      />
      <CustomerHalfContainer error={props.error} setError={props.setError} />
    </>
  );
};

const CustomerHalfContainer = (props) => {
  const [ticketNumber, setTicketNumber] = useState('');
  const [estimatedTime, setEstimatedTime] = useState('');
  const [loading, setLoading] = useState(true);

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

        setTicketNumber(data.ticketNumber || ''); 
        setEstimatedTime(data.estimatedTime || '');
      } catch (error) {
        console.log('Error fetching ticket data:', error);
        props.setError('Failed to fetch ticket data');
      } finally {
        setLoading(false); 
      }
    };

    fetchTicketData();
  }, [props]);

  if (loading) {
    return <div style={{ color: 'white' }}>Loading...</div>;
  }

  if (props.error) {
    return <div style={{ color: 'red' }}>{props.error}</div>; 
  }

  return (
    <div className="container vh-100 d-flex align-items-center justify-content-center">
      <div className="row w-100">
        <div className="col-md-6 d-flex flex-column justify-content-center align-items-center">
          <div className="info-container text-center">
            <h2 style={{ color: 'white', fontWeight: 'bold', fontSize: '3rem' }}>
              Your Ticket: {ticketNumber || 'N/A'}
            </h2>
            <p
              className={estimatedTime > 15 ? 'text-danger' : 'text-white'}
              style={{ fontWeight: 'bold' }}
            >
              Estimated waiting time: {estimatedTime} minutes
            </p>
            {ticketNumber ? (
              <div className="qr-code-container">
                <QRCode value={ticketNumber} />
              </div>
            ) : (
              <p style={{ color: 'red' }}>No ticket available to generate QR code.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerHalf;
