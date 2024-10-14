import React from 'react';
import CustomerHalf from './CustomerHalf';
import ManagerHalf from './ManagerHalf'; 
///imports of Counter and board should be addded


const Main = (props) => {
  const { role } = props; 

  
  const renderLeftHalf = () => {
    switch (role) {
      case 'manager':
        return <ManagerHalf />;
      case 'admin':
        return <CounterHalf />;
      default:
        return <CustomerHalf />;
    }
  };

  return (
    <div className="container-fluid vh-100">
      <div className="row h-100">
        <div className="col-md-6 p-0">
          {renderLeftHalf()}
        </div>

        <div className="col-md-6 d-flex align-items-center justify-content-center p-0 bg-dark">
          <Board />
        </div>
      </div>
    </div>
  );
};

export default Main;
