const SERVER_URL = 'http://localhost:3001';
import dayjs from 'dayjs';

const getTicket = async () => {
  try {
    const response = await fetch(SERVER_URL + '/api/service/ticket', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch a ticket: ${response.statusText}`);
    }

    const ticketData = await response.json();
    return ticketData;

  } catch (error) {
    console.error('Error fetching ticket:', error);
    throw error; // rethrow the error to handle it in the calling function
  }
};

/**
 * This function is to get a new ticket given the service type
 */
const getTicketByService = async (service) => {
  const requestBody = {
    service: service
  };
  return await fetch(SERVER_URL + '/api/service/ticket', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    body: JSON.stringify(requestBody),
  }).then(handleInvalidResponse).then(response => response.json());
};



const getNextTicket = async (counterID) => {
  try {
    const currentDate = dayjs().toISOString(); // Ottieni la data corrente in formato ISO
    console.log('Current date:', currentDate);
    console.log('Counter ID:', counterID); // Log del counterID

    const response = await fetch(SERVER_URL + '/api/service/ticket/next', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify({ counterID: counterID, date: currentDate }), // Invia il counterID e la data
    });

    console.log('Response:', response);

    if (!response.ok) {
      console.log('azzzzz');
      const errorBody = await response.text(); // Leggi il corpo della risposta
      throw new Error(`Failed to fetch the next ticket: ${response.statusText} - ${errorBody}`);
    }

    const nextTicketData = await response.json();
    console.log('Next ticket data:', nextTicketData);
    return nextTicketData;

  } catch (error) {
    console.error('Error fetching the next ticket:', error);
    throw error;
  }
};


/**
 * This function wants username and password inside a "credentials" object.
 * It executes the log-in.
 */
const logIn = async (credentials) => {
  return await fetch(SERVER_URL + '/api/sessions/login', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
      },
      credentials: 'include',  // this parameter specifies that authentication cookie must be forwared. It is included in all the authenticated APIs.
      body: JSON.stringify(credentials),
  }).then(handleInvalidResponse);
};

const getUserInfo = async () => {
  return await fetch(SERVER_URL + '/api/sessions/current', {
      credentials: 'include'
  }).then(handleInvalidResponse)
  .then(response => response.json());
};

/**
* This function destroy the current user's session (executing the log-out).
*/
const logOut = async() => {
  return await fetch(SERVER_URL + '/api/sessions/logout', {
    method: 'DELETE',
    credentials: 'include'
  }).then(handleInvalidResponse);
}


/**
 * Utility function to handle invalid responses from the server.
 */
function handleInvalidResponse(response) {
  if (!response.ok) { throw Error(response.statusText) }
  let type = response.headers.get('Content-Type');
  if (type !== null && type.indexOf('application/json') === -1){
      throw new TypeError(`Expected JSON, got ${type}`)
  }
  return response;
}

const API = {
  getTicket,
  logIn,
  getUserInfo,
  logOut,
  getNextTicket,
  getTicketByService
};

export default API;
