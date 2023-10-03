export function splitIntoBlocks(text) {
    const blockSize = 8; // 8字节
    const blocks = [];

    for (let i = 0; i < text.length; i += blockSize) {
        blocks.push(text.slice(i, i + blockSize));
    }

    return blocks;
};

export function splitBinaryIntoBlocks(binaryStr) {
    const blockSize = 64;  // 64 bits
    const blocks = [];

    for (let i = 0; i < binaryStr.length; i += blockSize) {
        blocks.push(binaryStr.slice(i, i + blockSize));
    }

    return blocks;
};


export function pkcs5Pad(data) {
    const blockSize = 8;  // for DES
    const padLength = blockSize - (data.length % blockSize);
    const pad = new Array(padLength).fill(padLength).map(e => String.fromCharCode(e)).join('');
    return data + pad;
}

export function pkcs5Unpad(paddedData) {
    const lastByte = paddedData.charCodeAt(paddedData.length - 1);
    return paddedData.slice(0, paddedData.length - lastByte);
}