import React from 'react';
import CustomerHalf from './components/CustomerHalf';
import backgroundImage from './assets/backgroundCustomer.jpg'; 

function App() {
  return (
    <div>
      <img src={backgroundImage} alt="Background Image" style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100vh',
        objectFit: 'cover',
        zIndex: -1
      }} />
      <CustomerHalf />
    </div>
  );
}

export default App;