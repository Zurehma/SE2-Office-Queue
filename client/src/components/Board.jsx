import React, { useState, useEffect } from 'react';
import API from '../API.mjs';


const TicketDisplay = () => {
  // Stato per il ticket attuale servito
  const [currentTicket, setCurrentTicket] = useState(null);
  const [error, setError] = useState(null);

  // Funzione per ottenere il ticket attuale dal backend
  const fetchCurrentTicket = async () => {
    try {
      const response = await API.getCurrentTicket();

      // Verifica se la richiesta è andata a buon fine
      if (!response.ok) {
        throw new Error('Errore nel recupero del ticket.');
      }

      const data = await response.json(); // Decodifica i dati JSON
      setCurrentTicket(data.ticketNumber); // Aggiorna lo stato con il numero del ticket
      setError(null); // Reset dell'errore se la richiesta ha successo
    } catch (err) {
      setError('Errore nel recupero del ticket.');
      setCurrentTicket(null); // Imposta a null in caso di errore
    }
  };

  // Effettua la richiesta al backend ogni 10 secondi
  useEffect(() => {
    fetchCurrentTicket(); // Prima chiamata per ottenere il ticket corrente

    const interval = setInterval(() => {
      fetchCurrentTicket(); // Aggiornamento ogni 10 secondi
    }, 10000); // 10 secondi

    return () => clearInterval(interval); // Pulisci l'intervallo quando il componente viene smontato
  }, []);

  return (
    <div>
      <h1>Sistema di Gestione Ticket</h1>
      <div>
        <h2>Ticket Attuale Servito:</h2>
        {error ? (
          <div style={{ color: 'red' }}>{error}</div>
        ) : currentTicket !== null ? (
          <div style={{ fontSize: '2em', color: 'green' }}>Ticket #{currentTicket}</div>
        ) : (
          <div style={{ fontSize: '1.5em' }}>Nessun ticket in servizio</div>
        )}
      </div>
    </div>
  );
};

export default TicketDisplay;











// import React, { useState, useEffect } from 'react';
// import API from '../API.mjs';


// const Board = () => {
//   const [calledTickets, setCalledTickets] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState('');

//   useEffect(() => {
//     const fetchCalledTickets = async () => {
//       try {
//         const response = await API.getCalledTickets();
        
//         if (!response.ok) {
//           throw new Error('Network response was not ok');
//         }

//         const data = await response.json();
//         setCalledTickets(data);
//       } catch (error) {
//         console.error('Error fetching called tickets:', error);
//         setError('Failed to fetch called tickets');
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchCalledTickets();
//   }, []);

//   if (loading) {
//     return <div style={{ color: 'white' }}>Loading...</div>;
//   }

//   if (error) {
//     return <div style={{ color: 'red' }}>{error}</div>;
//   }

//   return (
//     <div className="container vh-100 d-flex align-items-center justify-content-center">
//       <div className="row w-100">
//         <div className="col-md-6 d-flex flex-column justify-content-center align-items-center">
//           <div className="info-container text-center">
//             <h2 style={{ color: 'white', fontWeight: 'bold', fontSize: '3rem' }}>
//               Recently Called Tickets
//             </h2>
//             <ul style={{ listStyleType: 'none', padding: 0, color: 'white', fontSize: '2rem' }}>
//               {calledTickets.length > 0 ? (
//                 calledTickets.map((ticket, index) => (
//                   <li key={index} style={{ marginBottom: '10px' }}>
//                     Ticket Number: {ticket.ticketNumber}
//                   </li>
//                 ))
//               ) : (
//                 <p style={{ color: 'yellow' }}>No tickets called yet</p>
//               )}
//             </ul>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Board;