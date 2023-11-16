import React, { useState } from 'react';
import { Input, Button } from 'antd';
import CryptoJS from 'crypto-js';

const { TextArea } = Input;

function DES() {
    const [plainText, setPlainText] = useState('');
    const [encryptedText, setEncryptedText] = useState('');
    const [decryptedText, setDecryptedText] = useState('');
    const [key, setKey] = useState('');

    const handleEncrypt = () => {
        const encrypted = CryptoJS.DES.encrypt(plainText, key).toString();
        setEncryptedText(encrypted);
    };

    const handleDecrypt = () => {
        const decryptedBytes = CryptoJS.DES.decrypt(encryptedText, key);
        const decrypted = decryptedBytes.toString(CryptoJS.enc.Utf8);
        setDecryptedText(decrypted);
    };

    return (
        <div>
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
        </div>
    );
}

export default DES;
