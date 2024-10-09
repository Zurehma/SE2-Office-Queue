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




export default getTicket;
