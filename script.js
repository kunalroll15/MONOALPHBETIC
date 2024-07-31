document.getElementById('keyForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const plaintext = document.getElementById('plaintext').value.toLowerCase();
    const ciphertext = document.getElementById('ciphertext').value.toLowerCase();

    if (plaintext.length !== ciphertext.length) {
        alert('Plaintext and ciphertext must be the same length.');
        return;
    }

    const key = {};
    const reverseKey = {};

    for (let i = 0; i < plaintext.length; i++) {
        const pChar = plaintext[i];
        const cChar = ciphertext[i];

        if (key[pChar] && key[pChar] !== cChar) {
            alert('Inconsistent mapping found.');
            return;
        }
        key[pChar] = cChar;

        if (reverseKey[cChar] && reverseKey[cChar] !== pChar) {
            alert('Inconsistent reverse mapping found.');
            return;
        }
        reverseKey[cChar] = pChar;
    }

    // Generate full 26-letter key
    const alphabet = 'abcdefghijklmnopqrstuvwxyz';
    let fullKey = '';

    for (let char of alphabet) {
        fullKey += (key[char] || '?') + ' ';
    }

    document.getElementById('keyResult').textContent = JSON.stringify(key, null, 2);
    document.getElementById('reverseKeyResult').textContent = JSON.stringify(reverseKey, null, 2);
    document.getElementById('fullKeyResult').textContent = fullKey.trim();
});
