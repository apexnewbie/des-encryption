import React, { useState } from 'react';
import { Button, Input, Upload, message } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { stringToBinary, binaryToString, binaryToBase64, base64ToBinary } from '../utils/binary';
import { initialPermutation, inverseInitialPermutation } from '../utils/initialPermutation';
import { pkcs5Pad, pkcs5Unpad, splitIntoBlocks, splitBinaryIntoBlocks } from '../utils/textProcess';
import generateSubkeys from '../utils/keyGeneration';
import { sixteenRounds } from '../utils/loops';

function DESEncryption() {
    const [key, setKey] = useState("");       // To store the key
    const [text, setText] = useState("");     // To store the plaintext
    const [cipherText, setCipherText] = useState('');

    // File upload handler
    const handleFileUpload = (info) => {
        if (info.file.status === 'done' || info.file.status === 'error') {
            return; // Do nothing if upload status is 'done' or 'error'
        }

        const reader = new FileReader();
        reader.onload = () => {
            setText(reader.result);
        };
        reader.onerror = error => console.log(error.target.error);  // This will help identify any FileReader errors

        if (info.file instanceof Blob) {
            reader.readAsText(info.file);
        } else {
            console.error("Couldn't find the origin file object.");
        }
    };

    const handleEncryption = () => {
        message.info('Implement encryption');

        const cipherBinary = encryption(text, key);

        // Binary InitialPermutation Test
        setCipherText(binaryToBase64(cipherBinary));

        return cipherBinary;
    };

    const encryption = (text, key) => {
        // 1. Add Padding
        const paddedText = pkcs5Pad(text);
        // 2. Split Text into Blocks
        const blocks = splitIntoBlocks(paddedText);

        const subKeys = generateKeys(key);
        // console.log(subKeys);

        // 3. Convert each block to binary
        const encryptedBlocks = blocks.map(block => {
            const binary = initialPermutation(stringToBinary(block));
            const afterRounds = sixteenRounds(binary, subKeys);
            return inverseInitialPermutation(afterRounds);
        });
        // 4. Join all the binary blocks together
        const cipherBinary = encryptedBlocks.join('');

        return cipherBinary;
    }

    const handleDecryption = () => {
        message.info('Implement decryption');
        const plainText = decryption(text, key);
        setCipherText(plainText);
    };
    

    const decryption = (cipherText, key) => {
        const binaryText = base64ToBinary(cipherText);
        // 1. Split the cipherText into blocks
        const blocks = splitBinaryIntoBlocks(binaryText);

        const subKeys = generateSubkeys(key).reverse();  // The subkeys need to be used in reverse order for decryption

        // 2. Convert each block to binary and decrypt
        const decryptedBlocks = blocks.map(block => {
            const binary = initialPermutation(block);
            const afterRounds = sixteenRounds(binary, subKeys);
            return inverseInitialPermutation(afterRounds);
        });

        // 3. Join all the binary blocks together and convert to string
        const plainBinary = decryptedBlocks.join('');
        const paddedPlainText = binaryToString(plainBinary);
        const plainText = pkcs5Unpad(paddedPlainText);

        return plainText;
    };


    const generateKeys = (key) => {
        const subkeys = generateSubkeys(key);
        return subkeys;
    }

    return (
        <div>
            <h1>DES Encryption & Decryption Tool</h1>

            <Input
                placeholder="Enter key"
                value={key}
                onChange={e => setKey(e.target.value)}
                style={{ marginBottom: 20 }}
            />

            <Input.TextArea
                placeholder="Enter plaintext here"
                value={text}
                onChange={e => setText(e.target.value)}
                rows={4}
                style={{ marginTop: 20, marginBottom: 20 }}
            />

            <Upload beforeUpload={() => false} onChange={handleFileUpload} showUploadList={false}>
                <Button icon={<UploadOutlined />}>Upload plaintext or ciphertext file</Button>
            </Upload>

            <Input.TextArea
                placeholder="Encrypted text will appear here..."
                value={cipherText}
                rows={4}
                onChange={e => setCipherText(e.target.value)}
                style={{ marginTop: 20, marginBottom: 20 }}
            />

            <Button type='primary' onClick={handleEncryption} style={{ marginRight: 20 }}>
                Encrypt
            </Button>
            <Button type='primary' onClick={handleDecryption} style={{ marginRight: 20 }}>
                Decrypt
            </Button>
        </div>
    );
}

export default DESEncryption;
