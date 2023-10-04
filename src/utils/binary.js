export function stringToBinary(input) {
    const characters = input.split(''); // Split string into array of characters
    return characters.map(char => {
        const binary = char.charCodeAt(0).toString(2); // Convert character to binary
        const paddedBinary = binary.padStart(8, '0');
        return paddedBinary;
    }).join(''); // Join all the binary values together
}

export function binaryToString(binary) {
    const bytes = binary.match(/.{1,8}/g).join(' '); // Split the binary string into bytes of 8
    const chars = bytes.split(' ').map(byte => {
        return String.fromCharCode(parseInt(byte, 2));
    });
    return chars.join(''); // Join the characters together
}

export function binaryToBase64(binary) {
    // Split the binary string into bytes of 8
    const bytes = binary.match(/.{1,8}/g).map(byte => parseInt(byte, 2));

    // Convert bytes to characters
    const chars = bytes.map(byte => String.fromCharCode(byte)).join('');

    // Encode to Base64
    return btoa(chars);
}