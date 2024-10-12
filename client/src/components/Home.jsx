import React from 'react';



export function Home(){
  const handleClick = (serviceType) => {
    
  };

  return (
    <div className="service-wrapper">
      <h2 className="service-title">Select type of service</h2>
      <div className="service-container">
        <button className="service-button" onClick={() => handleClick('public_service')}>
          <i className="bi bi-bank service-icon"></i>
          <p>PUBLIC SERVICE</p>
        </button>

        <button className="service-button" onClick={() => handleClick('money_transfer')}>
          <i className="bi bi-cash-stack service-icon"></i>
          <p>MONEY TRANSFER</p>
        </button>

        <button className="service-button" onClick={() => handleClick('shipping_receiving')}>
          <i className="bi bi-truck service-icon"></i>
          <p>SHIPPING AND RECEIVING</p>
        </button>
      </div>
    </div>
  );
}

export default Home;