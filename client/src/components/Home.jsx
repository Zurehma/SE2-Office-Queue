import React from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../../Api';

export function Home(props){
  const navigate = useNavigate();

  const handleClick = (serviceType) => {

    API.getTicketByService(serviceType)
      .then((ticket) => {
        //here we should navigate to the correct page by passing the ticket as a prop
        navigate('/main', {state: {ticket: ticket}});
      })
      .catch((err) => { 
        props.setError(err);
      });
  };
  

  return (
    <div className="service-wrapper">
      <h2 className="service-title">Select type of service</h2>
      <div className="service-container">
        <button className="service-button" onClick={() => handleClick('public service')}>
          <i className="bi bi-bank service-icon"></i>
          <p>PUBLIC SERVICE</p>
        </button>

        <button className="service-button" onClick={() => handleClick('MONEY TRANSFER')}>
          <i className="bi bi-cash-stack service-icon"></i>
          <p>MONEY TRANSFER</p>
        </button>

        <button className="service-button" onClick={() => handleClick('shipping and RECEIVING')}>
          <i className="bi bi-truck service-icon"></i>
          <p>SHIPPING AND RECEIVING</p>
        </button>
      </div>
    </div>
  );
}

export default Home;