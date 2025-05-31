const https = require('https');
const fs = require('fs');

const options = {
  key: fs.readFileSync('resource-key.pem'),
  cert: fs.readFileSync('resource-cert.pem'),
};

https.createServer(options, (req, res) => {
  res.writeHead(200);
  res.end("Hello");
}).listen(3000, () => console.log('HTTPS сервер запущен'));

/*
openssl genrsa -out ca/ca-key.pem 2048
openssl req -new -x509 -days 365 -key ca/ca-key.pem -out ca/ca-cert.pem -subj "/CN=CA-LAB22-SIV"

openssl genrsa -out resource-key.pem 2048
openssl req -new -key resource-key.pem -out resource.csr -subj "/CN=RS-LAB22-ABC"

openssl x509 -req -in resource.csr -CA ca/ca-cert.pem -CAkey ca/ca-key.pem -CAcreateserial -out resource-cert.pem -days 365 -extfile ca/resource.ext
*/


