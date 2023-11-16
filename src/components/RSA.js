import React, { useState } from 'react';
import JSEncrypt from 'jsencrypt';
import { Input, Button, Typography } from 'antd';
import BatchTest from './BatchTest';

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

        const chunks = splitText(plainText, 100); // 假定每块最大100字符
        const encryptedChunks = chunks.map(chunk => {
            const encrypted = encrypt.encrypt(chunk);
            return btoa(encrypted); // 将加密文本转换为Base64编码
        });
        setEncryptedText(encryptedChunks.join('.')); // 使用点号(.)作为分隔符
        const end = performance.now();
        setEncryptionTime(end - start);
    };

    const handleDecrypt = () => {
        const start = performance.now();
        const decrypt = new JSEncrypt();
        decrypt.setPrivateKey(privateKey);

        const encryptedChunks = encryptedText.split('.'); // 按点号(.)分割加密文本
        const decryptedChunks = encryptedChunks.map(chunk => {
            const decrypted = decrypt.decrypt(atob(chunk)); // 将Base64编码转换回原始文本并解密
            return decrypted;
        });
        setDecryptedText(decryptedChunks.join(''));
        const end = performance.now();
        setDecryptionTime(end - start);
    };

    const encryptFunction = (text) => {
        const encrypt = new JSEncrypt();
        encrypt.setPublicKey(publicKey);

        // 分割文本，然后使用.map()一次性处理所有块
        return splitText(text, 100).map(chunk => {
            return btoa(encrypt.encrypt(chunk)); // 直接返回Base64编码的加密文本
        }).join('.'); // 使用点号作为分隔符
    };



    const decryptFunction = (encryptedText) => {
        const decrypt = new JSEncrypt();
        decrypt.setPrivateKey(privateKey);

        // 直接对分割的加密文本进行.map()操作
        return encryptedText.split('.').map(chunk => {
            return decrypt.decrypt(atob(chunk)); // 解密Base64编码的文本
        }).join(''); // 拼接解密后的文本
    };



    return (
        <div>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <Text style={{ margin: '10px 0' }}>Encryption time: {encryptionTime}ms</Text>
                <Text style={{ margin: '10px 0' }}>Decryption time: {decryptionTime}ms</Text>
            </div>
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
            <BatchTest encryptFunction={encryptFunction} decryptFunction={decryptFunction} />
        </div>
    );
}

export default RSA;
