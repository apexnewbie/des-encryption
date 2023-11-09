// RSA.js
import React, { useState } from 'react';
import { generateKeys } from '../rsautils/keyGen';

function RSA() {
    const [keys, setKeys] = useState({ publicKey: '', privateKey: '' });

    const handleGenerateKeys = () => {
        const generatedKeys = generateKeys();
        setKeys({
            publicKey: `(${generatedKeys.publicKey.n}, ${generatedKeys.publicKey.e})`,
            privateKey: `(${generatedKeys.privateKey.n}, ${generatedKeys.privateKey.d})`
        });
    };

    return (
        <div>
            <h1>RSA Key Generation</h1>
            <button onClick={handleGenerateKeys}>Generate Keys</button>
            <p>Public Key: {keys.publicKey}</p>
            <p>Private Key: {keys.privateKey}</p>
        </div>
    );
}

export default RSA;
