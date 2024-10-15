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
      <CustomerHalfContainer error={props.error} setError={props.setError} ticketInfo={props.ticket}  />
    </>
  );
};

const CustomerHalfContainer = (props) => {  
  const ticket = props.ticketInfo.ticket;
  const time = props.ticketInfo.estimatedWaitTime;

  
  
  
  

  if (props.error) {
    return <div style={{ color: 'red' }}>{props.error}</div>; 
  }

  // Ensure you access the ticket number correctly
  const ticketNumber = (ticket || 'N/A');  // Assuming `ticket` has a `ticket` field

  return (
    <div className="container vh-100 d-flex align-items-center justify-content-center">
      <div className="row w-100">
        <div className="col-md-6 d-flex flex-column justify-content-center align-items-center">
          <div className="info-container text-center">
            <h2 style={{ color: 'white', fontWeight: 'bold', fontSize: '3rem' }}>
              Your Ticket: {ticketNumber}  {/* Display the ticket number */}
            </h2>
            <p  
              className={time > 15 ? 'text-danger' : 'text-white'}
              style={{ fontWeight: 'bold' }}
            >
              
              Estimated waiting time: {time} minutes
            </p>
            {ticketNumber !== 'N/A' ? (
              <div className="qr-code-container">
                <QRCode value={ticketNumber} />  {/* Generate QR code for ticket number */}
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
