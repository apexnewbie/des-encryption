import React, { useState } from 'react';
import { Button, Input, Upload, message } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { stringToBinary, binaryToString } from '../utils/binary';
import { initialPermutation, inverseInitialPermutation } from '../utils/initialPermutation';
import { pkcs5Pad, pkcs5Unpad, splitIntoBlocks, splitBinaryIntoBlocks } from '../utils/textProcess';

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

        const binary = encryption(text, key);

        // Binary InitialPermutation Test
        // const blocks = splitBinaryIntoBlocks(binary);
        // let processedBinary = '';
        // for (let block of blocks) {
        //     processedBinary += inverseInitialPermutation(block);
        // }
        // setCipherText(pkcs5Unpad(binaryToString(processedBinary)));

        return binary;
    };

    const encryption = (text, key) => {
        // 1. Add Padding
        const paddedText = pkcs5Pad(text);
        // 2. Split Text into Blocks
        const blocks = splitIntoBlocks(paddedText);
        // 3. Convert each block to binary
        const encryptedBlocks = blocks.map(block => {
            const binary = initialPermutation(stringToBinary(block));
            return binary;
        });
        // 4. Join all the binary blocks together
        const binaryIp = encryptedBlocks.join('');

        return binaryIp;
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
            <Button type='primary' onClick={() => message.info('Implement decryption')}>
                Decrypt
            </Button>
        </div>
    );
}

export default DESEncryption;
