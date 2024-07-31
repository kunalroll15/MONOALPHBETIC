function createKeyMap(key) {
    const alphabet = 'abcdefghijklmnopqrstuvwxyz';
    const keyMap = {};
    for (let i = 0; i < alphabet.length; i++) {
        keyMap[alphabet[i]] = key[i];
    }
    return keyMap;
}

function encrypt(plaintext, key) {
    const keyMap = createKeyMap(key.toLowerCase());
    let ciphertext = '';
    for (let char of plaintext.toLowerCase()) {
        ciphertext += (keyMap[char] || char);
    }
    return ciphertext;
}

function decrypt(ciphertext, key) {
    const keyMap = createKeyMap(key.toLowerCase());
    const reverseKeyMap = Object.fromEntries(Object.entries(keyMap).map(([k, v]) => [v, k]));
    let plaintext = '';
    for (let char of ciphertext.toLowerCase()) {
        plaintext += (reverseKeyMap[char] || char);
    }
    return plaintext;
}

document.getElementById('encryptForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const plaintext = document.getElementById('plainText').value;
    const encryptionKey = document.getElementById('encryptionKey').value;
    if (encryptionKey.length !== 26 || !/^[a-z]+$/.test(encryptionKey)) {
        alert('Cipher key must be a 26-letter substitution of the alphabet.');
        return;
    }
    const encryptedText = encrypt(plaintext, encryptionKey);
    document.getElementById('encryptedText').textContent = encryptedText;
});

document.getElementById('decryptForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const ciphertext = document.getElementById('cipherText').value;
    const decryptionKey = document.getElementById('decryptionKey').value;
    if (decryptionKey.length !== 26 || !/^[a-z]+$/.test(decryptionKey)) {
        alert('Cipher key must be a 26-letter substitution of the alphabet.');
        return;
    }
    const decryptedText = decrypt(ciphertext, decryptionKey);
    document.getElementById('decryptedText').textContent = decryptedText;
});
