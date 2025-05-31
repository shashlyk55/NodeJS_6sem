const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();

app.use(express.static(path.join(__dirname, 'static')));

app.get('/wasm', async (req, res) => {
    try {
        const wasmPath = path.join(__dirname, 'static/func.wasm');
        const buffer = fs.readFileSync(wasmPath);
        res.set('Content-Type', 'application/wasm');
        res.send(buffer);
    } catch (err) {
        res.status(500).send('Error loading WASM file');
    }
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
















// let wasmCode = fs.readFileSync('static/qwe.wasm')
// console.log(wasmCode);
// let wasmImports = {}
// let wasmModule = new WebAssembly.Module(wasmCode)
// let wasmInstance = new WebAssembly.Instance(wasmModule, wasmImports)


// app.get('/', async (req, res) => {
//     res.type('html').send(
//         `
//         3 + 4 = ${wasmInstance.exports.sum(3, 4)}
//         3 - 4 = ${wasmInstance.exports.sub(3, 4)}
//         3 * 4 = ${wasmInstance.exports.mul(3, 4)}
//         `
//     )
// })