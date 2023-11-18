import React, { useState } from 'react';
import JSEncrypt from 'jsencrypt';
import { Input, Button, Typography } from 'antd';
import BatchTest from './BatchTest';
import '../static/encryption.css'

const { TextArea } = Input;
const { Text } = Typography;

function RSA() {
    const [plainText, setPlainText] = useState('');
    const [encryptedText, setEncryptedText] = useState('');
    const [decryptedText, setDecryptedText] = useState('');
    const [publicKey, setPublicKey] = useState('');
    const [privateKey, setPrivateKey] = useState('');
    const [encryptionTime, setEncryptionTime] = useState(0);
    const [decryptionTime, setDecryptionTime] = useState(0);


    const splitText = (text, size) => {
        const chunks = [];
        for (let i = 0; i < text.length; i += size) {
            chunks.push(text.substring(i, i + size));
        }
        return chunks;
    };

    const handleEncrypt = () => {
        const start = performance.now();
        const encrypt = new JSEncrypt();
        encrypt.setPublicKey(publicKey);

        const chunks = splitText(plainText, 100); // Assume that each chunk is 100 characters long
        const encryptedChunks = chunks.map(chunk => {
            const encrypted = encrypt.encrypt(chunk);
            return btoa(encrypted); // Convert the encrypted text to Base64
        });
        const end = performance.now();
        setEncryptedText(encryptedChunks.join('.')); // Use dot(.) as the separator
        setEncryptionTime(end - start);
    };

    const handleDecrypt = () => {
        const start = performance.now();
        const decrypt = new JSEncrypt();
        decrypt.setPrivateKey(privateKey);

        const encryptedChunks = encryptedText.split('.'); // Split the encrypted text
        const decryptedChunks = encryptedChunks.map(chunk => {
            const decrypted = decrypt.decrypt(atob(chunk)); // Decrypt the Base64 encoded text
            return decrypted;
        });
        const end = performance.now();
        setDecryptedText(decryptedChunks.join(''));
        setDecryptionTime(end - start);
    };

    const encryptFunction = (text) => {
        const encrypt = new JSEncrypt();
        encrypt.setPublicKey(publicKey);

        // Split the text into chunks and directly .map() the chunks
        return splitText(text, 100).map(chunk => {
            return btoa(encrypt.encrypt(chunk)); // Encrypt the chunk and convert it to Base64
        }).join('.'); // Join the encrypted chunks with dot(.)
    };



    const decryptFunction = (encryptedText) => {
        const decrypt = new JSEncrypt();
        decrypt.setPrivateKey(privateKey);

        // Split the encrypted text into chunks and directly .map() the chunks
        return encryptedText.split('.').map(chunk => {
            return decrypt.decrypt(atob(chunk)); // Decrypt the Base64 encoded chunk
        }).join(''); // Join the decrypted chunks
    };



    return (
        <div className='rsa-container'>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <Text className="margin-vertical-small">Encryption time: {encryptionTime}ms</Text>
                <Text className="margin-vertical-small">Decryption time: {decryptionTime}ms</Text>
            </div>
            <TextArea
                className="textarea-margin"
                value={publicKey}
                onChange={(e) => setPublicKey(e.target.value)}
                placeholder="Enter public key"
                rows={3}
            />
            <TextArea
                className="textarea-margin"
                value={privateKey}
                onChange={(e) => setPrivateKey(e.target.value)}
                placeholder="Enter private key"
                rows={3}
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

export default RSA;
