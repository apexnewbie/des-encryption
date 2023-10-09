// Split text into blocks
export function splitIntoBlocks(text) {
    const blockSize = 8; // 64 bits
    const blocks = [];

    for (let i = 0; i < text.length; i += blockSize) {
        blocks.push(text.slice(i, i + blockSize));
    }

    return blocks;
};

// Split a binary string into blocks
export function splitBinaryIntoBlocks(binaryStr) {
    const blockSize = 64;  // 64 bits
    const blocks = [];

    for (let i = 0; i < binaryStr.length; i += blockSize) {
        blocks.push(binaryStr.slice(i, i + blockSize));
    }

    return blocks;
};

// Pad data using PKCS5 padding for DES encryption
export function pkcs5Pad(data) {
    const blockSize = 8;  // for DES
    const encoder = new TextEncoder();
    const byteArray = encoder.encode(data);
    const padLength = blockSize - (byteArray.length % blockSize);
    const paddedByteArray = new Uint8Array(byteArray.length + padLength);
    paddedByteArray.set(byteArray);
    paddedByteArray.fill(padLength, byteArray.length);
    const decoder = new TextDecoder();
    return decoder.decode(paddedByteArray);
}

// Unpad PKCS5 padded data
export function pkcs5Unpad(paddedData) {
    const encoder = new TextEncoder();
    const byteArray = encoder.encode(paddedData);
    const lastByte = byteArray[byteArray.length - 1];
    const unpaddedByteArray = byteArray.slice(0, byteArray.length - lastByte);
    const decoder = new TextDecoder();
    return decoder.decode(unpaddedByteArray);
}