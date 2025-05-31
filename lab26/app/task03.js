const fs = require('fs');
const path = require('path');

async function loadWasm() {
    const wasmPath = path.join(__dirname, 'static/qwe.wasm');
    const buffer = fs.readFileSync(wasmPath);

    const { instance } = await WebAssembly.instantiate(buffer);
    return instance.exports;
}

async function main() {
    try {
        const wasmExports = await loadWasm();

        const sum = wasmExports.sum;
        const mul = wasmExports.mul;
        const sub = wasmExports.sub;

        console.log('5 + 3 =', sum(5, 3));
        console.log('5 * 3 =', mul(5, 3));
        console.log('5 - 3 =', sub(5, 3));

    } catch (err) {
        console.error('WASM error:', err);
    }
}

main();