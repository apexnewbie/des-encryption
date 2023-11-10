// RSA.js
import React, { useState } from 'react';
import { pki } from "node-forge";
import { Input, Button } from 'antd';

const bigInt = require('big-integer');

function RSA() {
    const [publicKey, setPublicKey] = useState('');
    const [privateKey, setPrivateKey] = useState('');
    const [inputText, setInputText] = useState('');
    const [encryptedText, setEncryptedText] = useState('');
    const [decryptedText, setDecryptedText] = useState('');

    function getPemParameters(pem) {
        let key;
        const params = {};

        if (pem.includes('PUBLIC KEY')) {
            key = pki.publicKeyFromPem(pem);
            params.n = key.n.toString(16);
            params.e = key.e.toString(16);
        } else if (pem.includes('PRIVATE KEY')) {
            key = pki.privateKeyFromPem(pem);
            params.n = key.n.toString(16);
            params.e = key.e.toString(16);
            params.d = key.d.toString(16);
        }

        return params;
    }




    function rsaEncrypt(text, e, n) {
        const encoder = new TextEncoder();
        const encodedMessage = encoder.encode(text);
        const hexMessage = Array.from(encodedMessage).map(byte => byte.toString(16).padStart(2, '0')).join('');
        const m = bigInt(hexMessage, 16);
        const ciphertext = m.modPow(bigInt(e, 16), bigInt(n, 16));
        return ciphertext.toString(16);
    }
    
    function rsaDecrypt(ciphertext, d, n) {
        const m = bigInt(ciphertext, 16);
        const plaintext = m.modPow(bigInt(d, 16), bigInt(n, 16));
        const hexPlaintext = plaintext.toString(16).padStart(2, '0');
        const bytes = new Uint8Array(hexPlaintext.match(/.{1,2}/g).map(byte => parseInt(byte, 16)));
        const decoder = new TextDecoder();
        return decoder.decode(bytes);
    }




    const handleEncrypt = () => {
        const { n, e } = getPemParameters(publicKey);
        const encrypted = rsaEncrypt(inputText, e, n);
        setEncryptedText(encrypted);
    };

    const handleDecrypt = () => {
        const { n, d } = getPemParameters(privateKey);
        const decrypted = rsaDecrypt(encryptedText, d, n);
        setDecryptedText(decrypted);
    };

    return (
        <div>
            <Input.TextArea rows={4} value={publicKey} onChange={(e) => setPublicKey(e.target.value)} placeholder="Enter Public Key" />
            <Input.TextArea rows={4} value={privateKey} onChange={(e) => setPrivateKey(e.target.value)} placeholder="Enter Private Key" />
            <Input value={inputText} onChange={(e) => setInputText(e.target.value)} placeholder="Enter text to encrypt" />
            <Button onClick={handleEncrypt}>Encrypt</Button>
            <Input.TextArea rows={4} value={encryptedText} readOnly />
            <Button onClick={handleDecrypt}>Decrypt</Button>
            <Input.TextArea rows={4} value={decryptedText} readOnly />
        </div>
    );
}

export default RSA;
