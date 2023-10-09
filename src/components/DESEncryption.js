import React, { useState } from 'react';
import { Button, Input, Upload, message } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { stringToBinary, binaryToString, binaryToBase64, base64ToBinary } from '../utils/binary';
import { initialPermutation, inverseInitialPermutation } from '../utils/initialPermutation';
import { pkcs5Pad, pkcs5Unpad, splitBinaryIntoBlocks } from '../utils/textProcess';
import generateSubkeys from '../utils/keyGeneration';
import { sixteenRounds } from '../utils/loops';

function DESEncryption() {
    const [key, setKey] = useState("");       // To store the key
    const [text, setText] = useState("");     // To store the plaintext
    const [cipherText, setCipherText] = useState('');

    // File upload handler
    const handleFileUpload = (info) => {
        try {
            if (info.file.status === 'done' || info.file.status === 'error') {
                return; // Do nothing if upload status is 'done' or 'error'
            }

            const reader = new FileReader();
            reader.onload = () => {
                setText(reader.result);
            };

            reader.onerror = error => {
                throw new Error(error.target.error);
            };

            if (!(info.file instanceof Blob)) {
                throw new Error("Couldn't find the origin file object.");
            }

            reader.readAsText(info.file);

        } catch (e) {
            message.error("Error in handleFileUpload: ", e);
        }
    };


    // Handle the encryption process
    const handleEncryption = () => {
        try {
            const binaryKey = stringToBinary(key);
            const cipherBinary = encryption(text, binaryKey);

            setCipherText(binaryToBase64(cipherBinary));
            message.info('Implement Encryption');
        } catch (error) {
            message.error(error.message);
        }
    };

    // Perform the encryption
    const encryption = (text, key) => {
        // Add Padding
        const paddedText = pkcs5Pad(text);
        // Convert to binary
        const binaryText = stringToBinary(paddedText);
        // Split binary into Blocks
        const blocks = splitBinaryIntoBlocks(binaryText);

        const subKeys = generateKeys(key);

        // Encrypt each block
        const encryptedBlocks = blocks.map(block => {
            const binary = initialPermutation(block);
            const afterRounds = sixteenRounds(binary, subKeys);
            return inverseInitialPermutation(afterRounds);
        });
        // Join all the binary blocks together
        const cipherBinary = encryptedBlocks.join('');

        return cipherBinary;
    }

    // Handle the decryption process
    const handleDecryption = () => {
        if (text.length === 0) {
            message.warning('Please enter ciphertext to decrypt');
            return;
        }

        try {
            const binaryKey = stringToBinary(key);
            const plainText = decryption(text, binaryKey);
            setCipherText(plainText);
            message.info('Implement Decryption');
        } catch (error) {
            message.error(error.message);
        }
    };

    // Perform the decryption
    const decryption = (cipherText, key) => {
        const binaryText = base64ToBinary(cipherText);
        // Split the cipherText into blocks
        const blocks = splitBinaryIntoBlocks(binaryText);

        const subKeys = generateSubkeys(key).reverse();  // The subKeys need to be used in reverse order for decryption

        // Decrypt each block
        const decryptedBlocks = blocks.map(block => {
            const binary = initialPermutation(block);
            const afterRounds = sixteenRounds(binary, subKeys);
            return inverseInitialPermutation(afterRounds);
        });

        // Join all the binary blocks together
        const plainBinary = decryptedBlocks.join('');
        const paddedPlainText = binaryToString(plainBinary);
        const plainText = pkcs5Unpad(paddedPlainText);

        return plainText;
    };


    // Generate the subKeys from the provided key
    const generateKeys = (key) => {
        const subkeys = generateSubkeys(key);
        return subkeys;
    }

    return (
        <div>
            <Input
                placeholder="Enter key"
                value={key}
                allowClear
                onChange={e => setKey(e.target.value)}
                style={{ marginBottom: 20 }}
            />

            <Input.TextArea
                placeholder="Enter plaintext or ciphertext here"
                value={text}
                onChange={e => setText(e.target.value)}
                rows={5}
                allowClear
                style={{ marginTop: 20, marginBottom: 20 }}
            />

            <Upload beforeUpload={() => false} onChange={handleFileUpload} showUploadList={false}>
                <Button icon={<UploadOutlined />}>Upload plaintext or ciphertext file</Button>
            </Upload>

            <Input.TextArea
                placeholder="Ciphertext or plaintext will be displayed here"
                value={cipherText}
                rows={5}
                allowClear
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
