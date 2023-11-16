import React, { useState } from 'react';
import { Button, Table } from 'antd';

function BatchTest({ key, encryptFunction, decryptFunction }) {
    const [testResults, setTestResults] = useState([]);

    // Generate test data
    const generateTestData = (minLength, maxLength, step) => {
        let testData = [];
        for (let length = minLength; length <= maxLength; length += step) {
            testData.push(''.padStart(length, 'a')); // Generate a string of length 'length' filled with 'a'
        }
        return testData;
    };

    // Run the tests
    const runTests = () => {
        const testData = generateTestData(100, 10000, 1000); // Generate test data
        let results = [];

        testData.forEach(text => {
            const startEncrypt = performance.now();
            const encrypted = encryptFunction(text, key);
            const endEncrypt = performance.now();

            const startDecrypt = performance.now();
            const decrypted = decryptFunction(encrypted, key);
            const endDecrypt = performance.now();

            results.push({
                messageLength: text.length,
                encryptionTime: endEncrypt - startEncrypt,
                decryptionTime: endDecrypt - startDecrypt
            });
        });

        setTestResults(results);
    };

    // Table columns
    const columns = [
        {
            title: 'Message Length',
            dataIndex: 'messageLength',
            key: 'messageLength',
        },
        {
            title: 'Encryption Time (ms)',
            dataIndex: 'encryptionTime',
            key: 'encryptionTime',
        },
        {
            title: 'Decryption Time (ms)',
            dataIndex: 'decryptionTime',
            key: 'decryptionTime',
        },
    ];

    return (
        <div>
            <Button type="primary" onClick={runTests}>Run Tests</Button>
            <Table dataSource={testResults} columns={columns} />
        </div>
    );
}

export default BatchTest;
