import React, { useState } from 'react';
import { Input, Button, Typography } from 'antd';
import CryptoJS from 'crypto-js';
import BatchTest from './BatchTest';
import '../static/encryption.css'

const { TextArea } = Input;
const { Text } = Typography;

function DES() {
    // State variables for the plain text, encrypted text, decrypted text, key, and timings
    const [plainText, setPlainText] = useState('');
    const [encryptedText, setEncryptedText] = useState('');
    const [decryptedText, setDecryptedText] = useState('');
    const [key, setKey] = useState('');
    const [encryptionTime, setEncryptionTime] = useState(0);
    const [decryptionTime, setDecryptionTime] = useState(0);


    // Function to handle the encryption process
    const handleEncrypt = () => {
        const start = performance.now();
        const encrypted = CryptoJS.DES.encrypt(plainText, key).toString();
        const end = performance.now();
        setEncryptedText(encrypted);
        setEncryptionTime(end - start);
    };

    // Function to handle the decryption process
    const handleDecrypt = () => {
        const start = performance.now();
        const decryptedBytes = CryptoJS.DES.decrypt(encryptedText, key);
        const decrypted = decryptedBytes.toString(CryptoJS.enc.Utf8);
        const end = performance.now();
        setDecryptedText(decrypted);
        setDecryptionTime(end - start);
    };

    // Helper functions for batch encryption and decryption
    const encryptFunction = (text) => CryptoJS.DES.encrypt(text, key).toString();
    const decryptFunction = (encryptedText) => {
        const decryptedBytes = CryptoJS.DES.decrypt(encryptedText, key);
        return decryptedBytes.toString(CryptoJS.enc.Utf8);
    };

    return (
        <div className='des-container'>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <Text className="margin-vertical-small">Encryption time: {encryptionTime}ms</Text>
                <Text className="margin-vertical-small">Decryption time: {decryptionTime}ms</Text>
            </div>
            <TextArea
                className="textarea-margin"
                value={key}
                onChange={(e) => setKey(e.target.value)}
                placeholder="Enter secret key"
                rows={2}
            />
            <TextArea
                className="textarea-margin"
                value={plainText}
                onChange={(e) => setPlainText(e.target.value)}
                placeholder="Enter text to encrypt or decrypt"
                rows={3}
            />
            <Button className="button-margin" type="primary" onClick={handleEncrypt}>Encrypt</Button>
            <TextArea className="textarea-margin" value={encryptedText} rows={4} />
            <Button className="button-margin" onClick={handleDecrypt}>Decrypt</Button>
            <TextArea className="textarea-margin" value={decryptedText} rows={4} />
            <BatchTest encryptFunction={encryptFunction} decryptFunction={decryptFunction} />
        </div>
    );
}

export default DES;
