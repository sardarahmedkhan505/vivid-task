import React, { useState } from 'react';
import useMetaMask from '../Hooks/useMetaMask';

import contractABI from '../ContractABI/ContractABi.json'

const SwapETHUSDC = () => {
    const { web3, accounts, error } = useMetaMask();
    const [amountOutMin, setAmountOutMin] = useState(0);
    const [swapAmount, setSwapAmount] = useState('');
    const [swapError, setSwapError] = useState('');
    const contractAddress = '0x854F47bE40Db52af552b9B86F14fE931636f79a0'; // Add quotes for address

    const handleSwap = async () => {
        try {
            if (!web3 || !accounts || accounts.length === 0) {
                throw new Error('Web3 or account not available');
            }

            if (!swapAmount || isNaN(parseFloat(swapAmount))) {
                throw new Error('Invalid swap amount');
            }

            // Create a contract instance
            const contract = new web3.eth.Contract(contractABI, contractAddress);

            const ethAmount = web3.utils.toWei(swapAmount, 'ether');
            const deadline = Math.floor(Date.now() / 1000) + 100; // 1 minute from now

            // Call the contract method
            await contract.methods
                .swapEthForUsdc(amountOutMin)
                .send({ from: accounts[0], value: ethAmount, gas: 3000000, deadline });

            setSwapError('');
            setSwapAmount('');
        } catch (error) {
            setSwapError(error.message);
        }
    };

    return (
        <div>
            <h2>Initiate ETH/USDC Swap</h2>
            <div>
                <label>Swap Amount (ETH):</label>
                <input
                    type="text"
                    value={swapAmount}
                    onChange={(e) => setSwapAmount(e.target.value)}
                />
            </div>
            <div>
                <label>Minimum USDC Amount:</label>
                <input
                    type="number"
                    value={amountOutMin}
                    onChange={(e) => setAmountOutMin(e.target.value)}
                />
            </div>
            <button onClick={handleSwap}>Swap ETH for USDC</button>
            {swapError && <div>Error: {swapError}</div>}
        </div>
    );
};

export default SwapETHUSDC;
