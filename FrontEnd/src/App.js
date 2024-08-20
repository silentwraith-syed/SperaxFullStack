import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import WalletConnection from './components/WalletConnection';
import WatchList from './components/WatchList';
// import TokenOperations from './components/TokenOperations';
// import HistoricalData from './components/HistoricalData';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<WalletConnection />} />
        <Route path="/watchlist" element={<WatchList />} />
        {/* <Route path="/operations" element={<TokenOperations />} />
        <Route path="/historical" element={<HistoricalData />} /> */}
      </Routes>
    </Router>
  );
}

export default App;
