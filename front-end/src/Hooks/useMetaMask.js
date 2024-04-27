import React, { useState, useEffect } from 'react';
import Web3 from 'web3';

const useMetaMask = () => {
    const [web3, setWeb3] = useState(null);
    const [accounts, setAccounts] = useState([]);
    const [error, setError] = useState(null);

    const connectToMetaMask = async () => {
        try {
            // Check if MetaMask is installed
            if (window.ethereum) {
                // Request account access if needed
                await window.ethereum.request({ method: 'eth_requestAccounts' });
                const provider = new Web3(window.ethereum);
                setWeb3(provider);

                // Fetch accounts
                const accs = await provider.eth.getAccounts();
                setAccounts(accs);
            } else {
                throw new Error('MetaMask not installed');
            }
        } catch (err) {
            setError(err.message);
        }
    };

    useEffect(() => {
        if (!web3 && !accounts.length) {
            connectToMetaMask();
        }
    }, [web3, accounts]);

    return { web3, accounts, error, connectToMetaMask };
};

export default useMetaMask;
