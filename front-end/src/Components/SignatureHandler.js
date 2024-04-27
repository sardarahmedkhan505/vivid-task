import React, { useState } from 'react';
import useMetaMask from '../Hooks/useMetaMask';

const SignatureHandler = () => {
    const { web3, accounts, error, connectToMetaMask } = useMetaMask();

    const [inputMessage, setInputMessage] = useState('');
    const [signedMessage, setSignedMessage] = useState('');
    const [validationResult, setValidationResult] = useState('');

    const signMessage = async () => {
        try {
            if (!web3 || accounts.length === 0) {
                console.error('Web3 or accounts not available');
                return;
            }

            if (!inputMessage) {
                console.error('Input message is required');
                return;
            }

            // Prompt user for password
            const password = prompt('Enter your MetaMask password:');
            if (!password) {
                console.error('Password is required');
                return;
            }

            // Sign the message
            const signature = await web3.eth.personal.sign(
                inputMessage,
                accounts[0],
                password
            );
            setSignedMessage(signature);
        } catch (error) {
            console.error('Failed to sign message:', error);
        }
    };

    const validateSignature = async () => {
        try {
            if (!web3 || !signedMessage || accounts.length === 0) {
                console.error('Web3, signed message, or accounts not available');
                return;
            }

            if (!inputMessage) {
                console.error('Input message is required');
                return;
            }

            // Recover the signing account from the signed message
            const recoveredAddress = await web3.eth.personal.ecRecover(
                inputMessage,
                signedMessage
            );

            // Compare recovered address with the connected account
            const isValid = recoveredAddress.toLowerCase() === accounts[0].toLowerCase();
            setValidationResult(isValid ? 'Signature is valid' : 'Signature is invalid');
        } catch (error) {
            console.error('Failed to validate signature:', error);
        }
    };

    return (
        <div>
            <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                placeholder="Enter message to sign"
            />
            <button onClick={signMessage}>Sign Message</button>
            {signedMessage && <div>Signed Message: {signedMessage}</div>}
            <button onClick={validateSignature}>Validate Signature</button>
            {validationResult && <div>{validationResult}</div>}
        </div>
    );
};

export default SignatureHandler;
