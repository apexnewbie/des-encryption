// Convert a string to a binary representation
export function stringToBinary(input) {
    const encoder = new TextEncoder();
    const byteArray = encoder.encode(input);
    return Array.from(byteArray).map(byte => byte.toString(2).padStart(8, '0')).join('');
}

// Convert a binary representation to a string
export function binaryToString(binary) {
    const byteArray = new Uint8Array(binary.match(/.{1,8}/g).map(byte => parseInt(byte, 2)));
    const decoder = new TextDecoder();
    return decoder.decode(byteArray);
}

// Convert a binary string representation to Base64
export function binaryToBase64(binary) {
    // Split the binary string into bytes of 8
    const bytes = binary.match(/.{1,8}/g).map(byte => parseInt(byte, 2));

    // Convert bytes to characters
    const chars = bytes.map(byte => String.fromCharCode(byte)).join('');

    // Encode to Base64
    return btoa(chars);
}

// Convert Base64 to a binary representation
export function base64ToBinary(base64) {
    // Decode from Base64 to get the characters
    const chars = atob(base64);

    // Convert characters to byte values
    const bytes = chars.split('').map(char => char.charCodeAt(0));

    // Convert byte values to binary strings, ensuring they're 8 bits long
    const binary = bytes.map(byte => byte.toString(2).padStart(8, '0')).join('');

    return binary;
}
