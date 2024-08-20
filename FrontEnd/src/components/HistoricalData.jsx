// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { Line } from 'react-chartjs-2';

// function HistoricalData({ address }) {
//   const [historicalData, setHistoricalData] = useState([]);
//   const [dateRange, setDateRange] = useState({ start: '', end: '' });

//   const fetchData = () => {
//     axios.get(`/api/historical/${address}`, { params: dateRange }).then((response) => setHistoricalData(response.data));
//   };

//   return (
//     <div>
//       <h2>Historical Data</h2>
//       <input type="date" onChange={(e) => setDateRange({ ...dateRange, start: e.target.value })} />
//       <input type="date" onChange={(e) => setDateRange({ ...dateRange, end: e.target.value })} />
//       <button onClick={fetchData}>Fetch Data</button>

//       <Line
//         data={{
//           labels: historicalData.map((entry) => entry.date),
//           datasets: [{ data: historicalData.map((entry) => entry.balance), label: 'Balance', borderColor: '#3e95cd' }],
//         }}
//       />
//     </div>
//   );
// }

// export default HistoricalData;
