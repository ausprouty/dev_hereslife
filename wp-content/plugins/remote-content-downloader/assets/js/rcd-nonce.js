// create a nonce for the remote content downloader plugin
//
// Example usage
//generateWordpressNonce('my_action').then(nonce => console.log(nonce));


async function generateWordpressNonce(action, expire = 3600) {
    // Add time-based salt (current time divided by expiration time)
    const time = Math.ceil(Date.now() / 1000 / expire);

    // Concatenate the action, time, and a secret salt (which should match the PHP constant)
    const secretSalt = RCDSettings.hlNonceSalt;  
    const dataToHash = secretSalt + action + time;

    // Convert the data to a Uint8Array for hashing
    const encoder = new TextEncoder();
    const data = encoder.encode(dataToHash);

    // Generate the SHA-256 hash using the SubtleCrypto API
    const hashBuffer = await crypto.subtle.digest('SHA-256', data);

    // Convert the hash to Base64
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const base64Hash = btoa(String.fromCharCode.apply(null, hashArray));

    return base64Hash;
}


