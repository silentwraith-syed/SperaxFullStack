import React, { useState, useEffect } from 'react';
import Web3 from 'web3';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

function App() {
  const [account, setAccount] = useState(null);
  const [balance, setBalance] = useState(null);
  const [isConnected, setIsConnected] = useState(false);
  const [watchlist, setWatchlist] = useState([]);
  const [selectedToken, setSelectedToken] = useState('');
  const [fromDate, setFromDate] = useState(null);
  const [toDate, setToDate] = useState(null);
  const [historicalData, setHistoricalData] = useState(null);

  const tokens = [
    { name: 'Bitcoin', id: 'bitcoin' },
    { name: 'Ethereum', id: 'ethereum' },
    { name: 'Solana', id: 'solana' },
    { name: 'Dogecoin', id: 'dogecoin' }
  ];

  useEffect(() => {
    if (isConnected) {
      const fetchAccountDetails = async () => {
        if (window.ethereum) {
          const web3 = new Web3(window.ethereum);
          try {
            const accounts = await web3.eth.getAccounts();
            const account = accounts[0];
            setAccount(account);

            const balanceWei = await web3.eth.getBalance(account);
            const balanceEth = web3.utils.fromWei(balanceWei, 'ether');
            console.log(balanceEth);
            setBalance(balanceEth);
          } catch (error) {
            console.error('Error fetching account details:', error);
          }
        }
      };
      fetchAccountDetails();
    }
  }, [isConnected]);

  const connectMetaMask = async () => {
    if (window.ethereum) {
      try {
        await window.ethereum.request({ method: 'eth_requestAccounts' });
        setIsConnected(true);
      } catch (error) {
        console.error('Error connecting to MetaMask:', error);
        setIsConnected(false);
      }
    } else {
      alert('MetaMask is not installed. Please install it to use this feature.');
    }
  };

  const addTokenToWatchlist = () => {
    if (selectedToken && !watchlist.includes(selectedToken)) {
      setWatchlist([...watchlist, selectedToken]);
    }
  };

  const fetchHistoricalData = async (tokenId, fromDate, toDate) => {
    const fromUnix = Math.floor(fromDate.getTime() / 1000);
    const toUnix = Math.floor(toDate.getTime() / 1000);

    const url = `https://api.coingecko.com/api/v3/coins/${tokenId}/market_chart/range?vs_currency=usd&from=${fromUnix}&to=${toUnix}`;
    
    const options = {
      method: 'GET',
      headers: { accept: 'application/json', 'x-cg-demo-api-key': 'CG-RDBBDCxJTDMtCjRwf8ATvU3p' }
    };

    try {
      const response = await fetch(url, options);
      const data = await response.json();
      setHistoricalData(data);
    } catch (error) {
      console.error('Error fetching historical data:', error);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Crypto-Portfolio App</h1>
        {isConnected ? (
          <div>
            <p><strong>Account:</strong> {account}</p>
            <p><strong>Balance:</strong> {balance} ETH</p>
            <div>
              <h2>Watchlist</h2>
              <select
                value={selectedToken}
                onChange={(e) => setSelectedToken(e.target.value)}
              >
                <option value="" disabled>Select a token</option>
                {tokens.map((token) => (
                  <option key={token.id} value={token.id}>
                    {token.name}
                  </option>
                ))}
              </select>
              <button onClick={addTokenToWatchlist}>Add to Watchlist</button>
              <ul>
                {watchlist.map((token, index) => (
                  <li key={index}>
                    {token}
                    <button onClick={() => fetchHistoricalData(token, fromDate, toDate)}>
                      View Historical Data
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3>Select Date Range</h3>
              <div>
                <label>From: </label>
                <DatePicker selected={fromDate} onChange={(date) => setFromDate(date)} />
              </div>
              <div>
                <label>To: </label>
                <DatePicker selected={toDate} onChange={(date) => setToDate(date)} />
              </div>
            </div>

            {historicalData && (
              <div>
                <h3>Historical Data</h3>
                <pre>{JSON.stringify(historicalData, null, 2)}</pre>
              </div>
            )}
          </div>
        ) : (
          <button onClick={connectMetaMask}>Connect MetaMask</button>
        )}
      </header>
    </div>
  );
}

export default App;
