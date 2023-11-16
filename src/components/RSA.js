import React, { useState } from 'react';
import JSEncrypt from 'jsencrypt';
import { Input, Button } from 'antd';

const { TextArea } = Input;

function RSA() {
    const [plainText, setPlainText] = useState('');
    const [encryptedText, setEncryptedText] = useState('');
    const [decryptedText, setDecryptedText] = useState('');
    const [publicKey, setPublicKey] = useState('');
    const [privateKey, setPrivateKey] = useState('');

    const splitText = (text, size) => {
        const chunks = [];
        for (let i = 0; i < text.length; i += size) {
            chunks.push(text.substring(i, i + size));
        }
        return chunks;
    };

    const handleEncrypt = () => {
        const encrypt = new JSEncrypt();
        encrypt.setPublicKey(publicKey);

        const chunks = splitText(plainText, 100); // 假定每块最大100字符
        const encryptedChunks = chunks.map(chunk => {
            const encrypted = encrypt.encrypt(chunk);
            return btoa(encrypted); // 将加密文本转换为Base64编码
        });
        setEncryptedText(encryptedChunks.join('.')); // 使用点号(.)作为分隔符
    };

    const handleDecrypt = () => {
        const decrypt = new JSEncrypt();
        decrypt.setPrivateKey(privateKey);

        const encryptedChunks = encryptedText.split('.'); // 按点号(.)分割加密文本
        const decryptedChunks = encryptedChunks.map(chunk => {
            const decrypted = decrypt.decrypt(atob(chunk)); // 将Base64编码转换回原始文本并解密
            return decrypted;
        });
        setDecryptedText(decryptedChunks.join(''));
    };

    return (
        <div>
            <TextArea
                value={publicKey}
                onChange={(e) => setPublicKey(e.target.value)}
                placeholder="Enter public key"
                rows={4}
            />
            <TextArea
                value={privateKey}
                onChange={(e) => setPrivateKey(e.target.value)}
                placeholder="Enter private key"
                rows={4}
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

export default RSA;
