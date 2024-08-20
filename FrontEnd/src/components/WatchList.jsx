import React, { useState } from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const WatchList = () => {
    const [address, setAddress] = useState('');
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const [balance, setBalance] = useState(null);

    const fetchHistoricalBalance = async () => {
        try {
            const response = await axios.get('http://localhost:5000/historical-balance', {
                params: {
                    address,
                    startDate: startDate.toISOString(),
                    endDate: endDate.toISOString(),
                },
            });
            setBalance(response.data);
        } catch (error) {
            console.error('Error fetching historical balance', error);
        }
    };

    return (
        <div>
            <h1>Historical Token Balance</h1>
            <input
                type="text"
                placeholder="Enter wallet address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
            />
            <DatePicker
                selected={startDate}
                onChange={(date) => setStartDate(date)}
                selectsStart
                startDate={startDate}
                endDate={endDate}
                dateFormat="yyyy/MM/dd"
            />
            <DatePicker
                selected={endDate}
                onChange={(date) => setEndDate(date)}
                selectsEnd
                startDate={startDate}
                endDate={endDate}
                minDate={startDate}
                dateFormat="yyyy/MM/dd"
            />
            <button onClick={fetchHistoricalBalance}>Fetch Balance</button>
            {balance && <div>Balance: {JSON.stringify(balance)}</div>}
        </div>
    );
};

export default WatchList;
