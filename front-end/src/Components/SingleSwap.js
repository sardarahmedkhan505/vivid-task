import React from 'react';
import useMetaMask from '../Hooks/useMetaMask';

const SingleSwap = () => {
    const { web3, accounts, error, connectToMetaMask } = useMetaMask();
    
    const connectWallet = async () => {
        if (!web3) {
            try {
                await connectToMetaMask();
            } catch (err) {
                console.error('Failed to connect wallet:', err);
            }
        }
    };

    return (
        <div>
            <button onClick={connectWallet}>Connect Wallet</button>
            {web3 && <div>Connected to MetaMask!</div>}
            {accounts.length > 0 && (
                <div>Connected Address: {accounts[0]}</div>
            )}
            {error && <div>Error: {error}</div>}
            <hr/>
        </div>
    );
};

export default SingleSwap;
