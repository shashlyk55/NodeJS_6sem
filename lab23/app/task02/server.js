const express = require('express');
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const app = express();


const { publicKey, privateKey } = crypto.generateKeyPairSync('rsa', {
    modulusLength: 2048,
});

app.get('/resource', (req, res) => {
    const filePath = path.join(__dirname, 'text.txt');
    const content = fs.readFileSync(filePath, 'utf8');

    const sign = crypto.createSign('SHA256');
    sign.update(content);
    sign.end();
    const signature = sign.sign(privateKey, 'base64');

    res.json({
        data: content,
        signature,
        publicKey: publicKey.export({ type: 'pkcs1', format: 'pem' })
    });
});

app.listen(3000, () => console.log('Server running on http://localhost:3000'));
