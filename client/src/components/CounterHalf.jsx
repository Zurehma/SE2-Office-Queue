import React, { useState, useEffect } from 'react';
import API from '../../Api.js'; 

const CounterHalf = (props) => {
  const [currentCustomer, setCurrentCustomer] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Funzione per ottenere il cliente corrente da servire
  const fetchCustomerData = async () => {
    try {
      const data = await API.getNextTicket(2); // Ottieni i dati direttamente
      console.log('Dati ricevuti dal server:', data); // Log per verificare i dati ricevuti
      setCurrentCustomer(data); // Imposta il cliente attuale
      setError(''); // Pulisce eventuali errori
    } catch (error) {
      console.error('Error fetching customer data:', error);
      setError('Errore nel recupero del clienteeee');
    } finally {
      setLoading(false);
    }
  };
  
  

  // Funzione per passare al prossimo cliente
  const handleNextCustomer = async () => {
    setLoading(true); // Imposta lo stato di caricamento
    await fetchCustomerData(); // Richiama la funzione per ottenere il prossimo cliente
  };

  // Prima chiamata per ottenere il cliente attuale
  useEffect(() => {
    fetchCustomerData();
  }, []);

  if (loading) {
    return <div style={{ color: 'white' }}>Caricamento...</div>;
  }

  if (error) {
    return <div style={{ color: 'red' }}>{error}</div>;
  }

  return (
    <div className="container vh-100 d-flex align-items-center justify-content-center">
      <div className="row w-100">
        <div className="col-md-6 d-flex flex-column justify-content-center align-items-center">
          <div className="info-container text-center">
            <p style={{ color: 'white', fontWeight: 'bold' }}>
              Ticket in Servizio: {currentCustomer.ticketNumber}
            </p>
            <button
              className="btn btn-primary"
              onClick={handleNextCustomer}
              style={{ marginTop: '20px' }}
            >
              Prossimo Cliente
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CounterHalf;









// const getNextTicket = async (counterID) => {
//   try {
//     const currentDate = dayjs().toISOString(); // Ottieni la data corrente in formato ISO
//     console.log('Current date:', currentDate);
//     console.log('Counter ID:', counterID); // Log del counterID

//     const response = await fetch(SERVER_URL + '/api/service/ticket/next', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       credentials: 'include',
//       body: JSON.stringify({ counterID: counterID, date: currentDate }), // Invia il counterID e la data
//     });
//     console.log('booooh');
//     console.log('Response:', response);
//     if (!response.ok) {
//       console.log('azzzzz');
//       const errorBody = await response.text(); // Leggi il corpo della risposta
//       throw new Error(`Failed to fetch the next ticket: ${response.statusText} - ${errorBody}`);
//     }

//     const nextTicketData = await response.json();
//     console.log('Next ticket data:', nextTicketData);
//     return nextTicketData;

//   } catch (error) {
//     console.error('Error fetching the next ticket:', error);
//     throw error;
//   }
// };
