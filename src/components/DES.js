import React, { useState } from 'react';
import { Input, Button, Typography } from 'antd';
import CryptoJS from 'crypto-js';
import BatchTest from './BatchTest';

const { TextArea } = Input;
const { Text } = Typography;

function DES() {
    const [plainText, setPlainText] = useState('');
    const [encryptedText, setEncryptedText] = useState('');
    const [decryptedText, setDecryptedText] = useState('');
    const [key, setKey] = useState('');
    const [encryptionTime, setEncryptionTime] = useState(0);
    const [decryptionTime, setDecryptionTime] = useState(0);


    const handleEncrypt = () => {
        const start = performance.now();
        const encrypted = CryptoJS.DES.encrypt(plainText, key).toString();
        setEncryptedText(encrypted);
        const end = performance.now();
        setEncryptionTime(end - start);
    };

    const handleDecrypt = () => {
        const start = performance.now();
        const decryptedBytes = CryptoJS.DES.decrypt(encryptedText, key);
        const decrypted = decryptedBytes.toString(CryptoJS.enc.Utf8);
        setDecryptedText(decrypted);
        const end = performance.now();
        setDecryptionTime(end - start);
    };

    const encryptFunction = (text) => CryptoJS.DES.encrypt(text, key).toString();
    const decryptFunction = (encryptedText) => {
        const decryptedBytes = CryptoJS.DES.decrypt(encryptedText, key);
        return decryptedBytes.toString(CryptoJS.enc.Utf8);
    };

    return (
        <div>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <Text style={{ margin: '10px 0' }}>Encryption time: {encryptionTime}ms</Text>
                <Text style={{ margin: '10px 0' }}>Decryption time: {decryptionTime}ms</Text>
            </div>
            <TextArea
                value={key}
                onChange={(e) => setKey(e.target.value)}
                placeholder="Enter secret key"
                rows={2}
            />
            <TextArea
                value={plainText}
                onChange={(e) => setPlainText(e.target.value)}
                placeholder="Enter text to encrypt"
            />
            <Button type="primary" onClick={handleEncrypt}>Encrypt</Button>
            <TextArea value={encryptedText} rows={4} />
            <Button onClick={handleDecrypt}>Decrypt</Button>
            <TextArea value={decryptedText} rows={4} />
            <BatchTest encryptFunction={encryptFunction} decryptFunction={decryptFunction} />
        </div>
    );
}

export default DES;
