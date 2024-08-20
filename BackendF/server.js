// const fetch = require('node-fetch');

// // Define the parameters
// const from = '1638316800'; // Example start timestamp
// const to = '1638912000';   // Example end timestamp
// const vs_currency = 'usd';  // Example currency
// const id = 'bitcoin';      // Example coin ID

// // bitcoin, ethereum, solana, dogecoin

// // Construct the URL with query parameters
// const url = `https://api.coingecko.com/api/v3/coins/${id}/market_chart/range?vs_currency=${vs_currency}&from=${from}&to=${to}`;

// const options = {
//   method: 'GET',
//   headers: {accept: 'application/json', 'x-cg-demo-api-key': 'CG-RDBBDCxJTDMtCjRwf8ATvU3p'}
// };

// fetch(url, options)
//   .then(res => res.json())
//   .then(json => console.log(json))
//   .catch(err => console.error('error:' + err));

// // // Create a Date object with a specific date and time
// // const date = new Date('2024-08-20T12:00:00Z'); // Example: August 20, 2024, 12:00 UTC

// // // Get the Unix timestamp (in seconds)
// // const timestamp = Math.floor(date.getTime() / 1000);

// // console.log(timestamp);


const express = require('express');
const fetch = require('node-fetch');
const cors = require('cors');

const app = express();
const PORT = 5000;

// Enable CORS for all origins (this is optional, for development)
app.use(cors());

// Enable JSON parsing for POST requests
app.use(express.json());

// Endpoint to get historical data
app.post('/api/historical-data', async (req, res) => {
  const { tokenId, from, to } = req.body;
  
  if (!tokenId || !from || !to) {
    return res.status(400).json({ error: 'Missing required parameters' });
  }

  const url = `https://api.coingecko.com/api/v3/coins/${tokenId}/market_chart/range?vs_currency=usd&from=${from}&to=${to}`;
  const options = {
    method: 'GET',
    headers: { accept: 'application/json', 'x-cg-demo-api-key': 'CG-RDBBDCxJTDMtCjRwf8ATvU3p' }
  };

  try {
    const response = await fetch(url, options);
    const data = await response.json();
    return res.status(200).json(data);
  } catch (error) {
    console.error('Error fetching historical data:', error);
    return res.status(500).json({ error: 'Failed to fetch historical data' });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});


