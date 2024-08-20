// import React, { useState } from 'react';
// import Web3 from 'web3';

// function TokenOperations({ address }) {
//   const [recipient, setRecipient] = useState('');
//   const [amount, setAmount] = useState('');

//   const handleTransfer = async () => {
//     const web3 = new Web3(window.ethereum);
//     const tokenContract = new web3.eth.Contract(ERC20_ABI, TOKEN_ADDRESS);
//     await tokenContract.methods.transfer(recipient, web3.utils.toWei(amount)).send({ from: address });
//   };

//   return (
//     <div>
//       <h2>Token Operations</h2>
//       <input type="text" placeholder="Recipient Address" onChange={(e) => setRecipient(e.target.value)} />
//       <input type="text" placeholder="Amount" onChange={(e) => setAmount(e.target.value)} />
//       <button onClick={handleTransfer}>Transfer</button>
//     </div>
//   );
// }

// export default TokenOperations;
