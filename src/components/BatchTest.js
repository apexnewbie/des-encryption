import React, { useState } from 'react';
import { Button, Table, InputNumber, Row, Col } from 'antd';

function BatchTest({ encryptFunction, decryptFunction }) {
    const [testResults, setTestResults] = useState([]);
    const [minLength, setMinLength] = useState(100);
    const [maxLength, setMaxLength] = useState(10000);
    const [step, setStep] = useState(1000);

    // Generate test data
    const generateTestData = (minLength, maxLength, step) => {
        let testData = [];
        for (let length = minLength; length <= maxLength; length += step) {
            testData.push(''.padStart(length, 'a')); // Generate a string of length 'length' filled with 'a'
        }
        return testData;
    };

    // Run the tests
    const runTests = (minLength, maxLength, step) => {
        const testData = generateTestData(minLength, maxLength, step); // Generate test data
        let results = [];

        testData.forEach(text => {
            const startEncrypt = performance.now();
            const encrypted = encryptFunction(text);
            const endEncrypt = performance.now();

            const startDecrypt = performance.now();
            const decrypted = decryptFunction(encrypted);
            const endDecrypt = performance.now();

            results.push({
                key: text.length, // Use messageLength as the unique key
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
            <Row gutter={16}>
                <Col>
                    <InputNumber min={1} max={10000} defaultValue={100} onChange={setMinLength} />
                </Col>
                <Col>
                    <InputNumber min={1} max={10000} defaultValue={10000} onChange={setMaxLength} />
                </Col>
                <Col>
                    <InputNumber min={1} max={1000} defaultValue={1000} onChange={setStep} />
                </Col>
                <Col>
                    <Button type="primary" onClick={() => runTests(minLength, maxLength, step)}>Run Tests</Button>
                </Col>
            </Row>
            <Table dataSource={testResults} columns={columns} />
        </div>
    );
}

export default BatchTest;
