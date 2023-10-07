export function stringToBinary(input) {
    // const characters = input.split(''); // Split string into array of characters
    // return characters.map(char => {
    //     const binary = char.charCodeAt(0).toString(2); // Convert character to binary
    //     const paddedBinary = binary.padStart(8, '0');
    //     return paddedBinary;
    // }).join(''); // Join all the binary values together
    const encoder = new TextEncoder();
    const byteArray = encoder.encode(input);
    return Array.from(byteArray).map(byte => byte.toString(2).padStart(8, '0')).join('');
}

export function binaryToString(binary) {
    // const bytes = binary.match(/.{1,8}/g).join(' '); // Split the binary string into bytes of 8
    // const chars = bytes.split(' ').map(byte => {
    //     return String.fromCharCode(parseInt(byte, 2));
    // });
    // return chars.join(''); // Join the characters together
    const byteArray = new Uint8Array(binary.match(/.{1,8}/g).map(byte => parseInt(byte, 2)));
    const decoder = new TextDecoder();
    return decoder.decode(byteArray);
}

export function binaryToBase64(binary) {
    // Split the binary string into bytes of 8
    const bytes = binary.match(/.{1,8}/g).map(byte => parseInt(byte, 2));

    // Convert bytes to characters
    const chars = bytes.map(byte => String.fromCharCode(byte)).join('');

    // Encode to Base64
    return btoa(chars);
}

export function base64ToBinary(base64) {
    // Decode from Base64 to get the characters
    const chars = atob(base64);

    // Convert characters to byte values
    const bytes = chars.split('').map(char => char.charCodeAt(0));

    // Convert byte values to binary strings, ensuring they're 8 bits long
    const binary = bytes.map(byte => byte.toString(2).padStart(8, '0')).join('');

    return binary;
}
