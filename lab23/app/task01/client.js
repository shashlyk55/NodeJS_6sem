const axios = require('axios');
const crypto = require('crypto');
const fs = require('fs');

(async () => {
    const { data: serverParams } = await axios.get('http://localhost:3000/dh');

    const dh = crypto.createDiffieHellman(
        Buffer.from(serverParams.prime, 'hex'),
        Buffer.from(serverParams.generator, 'hex')
    );
    const clientPublicKey = dh.generateKeys();
    const sharedSecret = dh.computeSecret(Buffer.from(serverParams.serverPublicKey, 'hex'));

    // server: A = g^a mod p , A send to client
    // client: B = g^b mod p , B send to server
    // server shared: S = B^a mod p = (g^b)^a mod p = g^(ab) mod p
    // client shared: S = A^b mod p = (g^a)^b mod p = g^(ab) mod p
    // g^(ab) (mod p)

    await axios.post('http://localhost:3000/key', {
        clientPublicKey: clientPublicKey.toString('hex')
    });

    const { data: encryptedFile } = await axios.get('http://localhost:3000/resource');

    const key = crypto.createHash('sha256').update(sharedSecret).digest()
    const decipher = crypto.createDecipheriv(
        'aes-256-cbc',
        key,
        Buffer.from(encryptedFile.iv, 'hex')
    );
    let decrypted = decipher.update(encryptedFile.data, 'hex', 'utf8');
    decrypted += decipher.final('utf8');


    fs.writeFileSync('qwe.txt', decrypted);
    console.log('Decrypted file saved as qwe.txt');
})();
