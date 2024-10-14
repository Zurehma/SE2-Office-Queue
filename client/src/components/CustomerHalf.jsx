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
      <CustomerHalfContainer error={props.error} setError={props.setError} ticket={props.ticket} estimatedTime={props.estimatedTime} />
    </>
  );
};

const CustomerHalfContainer = (props) => {
  const [ticketNumber, setTicketNumber] = useState(props.ticket);
  const [estimatedTime, setEstimatedTime] = useState(props.estimatedTime);
  const [error, setError] = useState(null)


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
