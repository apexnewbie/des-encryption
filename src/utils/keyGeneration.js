const PC1 = [
    57, 49, 41, 33, 25, 17, 9,
    1, 58, 50, 42, 34, 26, 18,
    10, 2, 59, 51, 43, 35, 27,
    19, 11, 3, 60, 52, 44, 36,
    63, 55, 47, 39, 31, 23, 15,
    7, 62, 54, 46, 38, 30, 22,
    14, 6, 61, 53, 45, 37, 29,
    21, 13, 5, 28, 20, 12, 4
];

const keyShifts = [1, 1, 2, 2, 2, 2, 2, 2, 1, 2, 2, 2, 2, 2, 2, 1];

const PC2 = [
    14, 17, 11, 24, 1, 5,
    3, 28, 15, 6, 21, 10,
    23, 19, 12, 4, 26, 8,
    16, 7, 27, 20, 13, 2,
    41, 52, 31, 37, 47, 55,
    30, 40, 51, 45, 33, 48,
    44, 49, 39, 56, 34, 53,
    46, 42, 50, 36, 29, 32
];

const applyPC1 = (key) => {
    return PC1.map(index => key[index - 1]).join('');
};

const applyPC2 = (key) => {
    return PC2.map(index => key[index - 1]).join('');
};

const shiftLeft = (key, shifts) => {
    return key.slice(shifts).concat(key.slice(0, shifts));
};

const generateSubkeys = (key) => {
    const initial = applyPC1(key);
    let left = initial.slice(0, 28);
    let right = initial.slice(28, 56);

    const subkeys = [];

    for (let i = 0; i < 16; i++) {
        left = shiftLeft(left, keyShifts[i]);
        right = shiftLeft(right, keyShifts[i]);

        const combined = left + right;
        const subkey = applyPC2(combined);

        subkeys.push(subkey);
    }

    return subkeys;
};

export default generateSubkeys;