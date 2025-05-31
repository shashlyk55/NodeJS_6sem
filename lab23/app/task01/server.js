const express = require('express');
const crypto = require('crypto');
const fs = require('fs');
const path = require('path')
const app = express();
app.use(express.json());

let serverDH, sharedSecret;

app.get('/dh', (req, res) => {
    serverDH = crypto.createDiffieHellman(2048)
    serverPublicKey = serverDH.generateKeys()

    res.json({
        prime: serverDH.getPrime('hex'),
        generator: serverDH.getGenerator('hex'),
        serverPublicKey: serverPublicKey.toString('hex')
    });
});

app.post('/key', (req, res) => {
    try {
        const clientPublicKey = Buffer.from(req.body.clientPublicKey, 'hex');
        sharedSecret = serverDH.computeSecret(clientPublicKey);

        res.json({ message: 'Key exchange successful' });
    } catch (e) {
        res.status(409).json({ error: 'Invalid key exchange' });
    }
});

app.get('/resource', (req, res) => {
    if (!sharedSecret) return res.status(403).json({ error: 'Unauthorized' });

    const fileContent = fs.readFileSync(path.join(__dirname, 'fio.txt'))
    const key = crypto.createHash('sha256').update(sharedSecret).digest()
    const iv = crypto.randomBytes(16);
    const cipher = crypto.createCipheriv('aes-256-cbc', key, iv);
    let encrypted = cipher.update(fileContent, 'utf8', 'hex');
    encrypted += cipher.final('hex');

    res.json({
        iv: iv.toString('hex'),
        data: encrypted
    });
});

app.listen(3000, () => console.log('Server running on http://localhost:3000'));
