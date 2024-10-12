const SERVER_URL = 'http://localhost:3001';

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
 * This function wants username and password inside a "credentials" object.
 * It executes the log-in.
 */
const logIn = async (credentials) => {
  console.log(credentials)
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
  logOut
};

export default API;
