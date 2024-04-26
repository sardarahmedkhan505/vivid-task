import React, { useState } from 'react';
import Web3 from 'web3';
import { EthereumProvider } from '@walletconnect/ethereum-provider';

const WalletConnectButton = () => {
    const [web3, setWeb3] = useState(null);
    const [walletAddress, setWalletAddress] = useState('');
    const [signature, setSignature] = useState('');

    const connectWallet = async () => {
        try {
            const provider = await EthereumProvider.init({
                projectId: '64bf13459c411d832bdc381bf3194def',
                metadata: {
                    name: 'UniSwap',
                    description: 'Eth to USDC single swap with delay of 1 minute',
                    url: 'https://mywebsite.com', // origin must match your domain & subdomain
                    icons: ['https://avatars.githubusercontent.com/u/37784886']
                },
                showQrModal: true,
                optionalChains: [1]
            });

            // Specify the RPC URL for the mainnet directly
            provider.config({ rpc: 'https://eth-mainnet.g.alchemy.com/v2/FPbecKOYVQVlWu9rHT3X3_Kkb6m4nl4E' });

            await provider.enable();
            const web3 = new Web3(provider);
            setWeb3(web3);

            // Fetch the connected wallet's address
            const accounts = await web3.eth.getAccounts();
            if (accounts.length > 0) {
                setWalletAddress(accounts[0]);

                // Prompt the user to sign a message
                const message = 'Sign this message to validate your wallet connection';
                const signedMessage = await web3.eth.personal.sign(message, accounts[0]);
                setSignature(signedMessage);
            }
        } catch (error) {
            console.error('Failed to connect wallet:', error);
        }
    };

    return (
        <div>
            <button onClick={connectWallet}>Connect Wallet</button>
            {walletAddress && (
                <div>
                    <p>Connected Wallet Address: {walletAddress}</p>
                    {signature && (
                        <p>Signature: {signature}</p>
                    )}
                </div>
            )}
        </div>
    );
};

export default WalletConnectButton;
