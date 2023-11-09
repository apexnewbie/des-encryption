// rsautils/keyGen.js
import { gcd } from 'math';
const { generatePrime } = require('crypto');

const generatePrimeNum = (bits) => {
    // TODO: Implement prime number generation
    // Consider using an existing library
    return generatePrime(bits);
};

const calculateN = (p, q) => p * q;

const calculateEulerTotient = (p, q) => (p - 1) * (q - 1);

const selectE = (totient) => {
    // TODO: Implement selection of e that is co-prime to totient
    // This might involve checking gcd(e, totient) === 1
    for (let i = 2; i < totient; i++) {
        if (gcd(i, totient) === 1) {
            return i;
        }
    }
    throw new Error('Failed to select e');
};

const calculateD = (e, totient) => {
    // TODO: Implement calculation of d
    // This involves finding an integer d such that (d * e) % totient === 1
    for (let i = 1; i < totient; i++) {
        if ((i * e) % totient === 1) {
            return i;
        }
    }
    throw new Error('Failed to calculate d');
};

const generateKeys = () => {
    const p = generatePrimeNum(1024);
    const q = generatePrimeNum(1024);
    const n = calculateN(p, q);
    const totient = calculateEulerTotient(p, q);
    const e = selectE(totient);
    const d = calculateD(e, totient);
    
    return {
        publicKey: { n, e },
        privateKey: { n, d }
    };
};

export {
    generatePrimeNum,
    calculateN,
    calculateEulerTotient,
    selectE,
    calculateD,
    generateKeys
};
