import React, { useState } from 'react';
import { Button, Table } from 'antd';

function BatchTest({ key, encryptFunction, decryptFunction }) {
    const [testResults, setTestResults] = useState([]);

    // 自动生成测试数据
    const generateTestData = (minLength, maxLength, step) => {
        let testData = [];
        for (let length = minLength; length <= maxLength; length += step) {
            testData.push(''.padStart(length, 'a')); // 生成指定长度的字符串
        }
        return testData;
    };

    // 执行测试
    const runTests = () => {
        const testData = generateTestData(100, 10000, 1000); // 生成测试数据
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

    // 渲染测试结果的表格
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
