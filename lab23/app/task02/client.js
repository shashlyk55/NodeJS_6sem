const axios = require('axios');
const crypto = require('crypto');
const fs = require('fs');

(async () => {
    try {
        const res = await axios.get('http://localhost:3000/resource');
        const { data, signature, publicKey } = res.data;

        const verifier = crypto.createVerify('SHA256');
        verifier.update(data);
        verifier.end();

        const isValid = verifier.verify(publicKey, signature, 'base64');

        if (isValid) {
            console.log('valid');
            fs.writeFileSync('task02.txt', data);
        } else {
            console.log('invalid');

        }

    } catch (err) {
        if (err.response) {
            console.error('Ошибка:', err.response.status, err.response.data);
        } else {
            console.error('Ошибка:', err.message);
        }
    }
})();
