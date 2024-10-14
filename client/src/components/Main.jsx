import React from 'react';
import CustomerHalf from './CustomerHalf';
import ManagerHalf from './ManagerHalf'; 
import Board from './Board';
import CounterHalf from './CounterHalf';
import { useLocation } from 'react-router-dom';
import { useState } from 'react';

const Main = (props) => {
  const { role } = props; 
  const location = useLocation();
  const ticket = location.state?.ticket;  
  const [currentCustomer, setCurrentCustomer] = useState(null);
  
  

  
  const renderLeftHalf = () => {
    switch (role) {
      case 'manager':
        return <CounterHalf currentCustomer={currentCustomer} setCurrentCustomer={setCurrentCustomer}/>;
      case 'admin':
        return <ManagerHalf />;
      default:
        return <CustomerHalf ticket = {ticket}/>;
    }
  };

  return (
    <div className="container-fluid vh-100">
      <div className="row h-100">
        <div className="col-md-6 p-0">
          {renderLeftHalf()}
        </div>

        <div className="col-md-6 d-flex align-items-center justify-content-center p-0 bg-dark">
          <Board currentCustomer={currentCustomer}/>
        </div>
      </div>
    </div>                        
  );
};

export default Main;
