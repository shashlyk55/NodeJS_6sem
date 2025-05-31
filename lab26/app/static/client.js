let wasmExports = null;

async function loadWasm() {
    try {
        const response = await fetch('/wasm');
        const buffer = await response.arrayBuffer();
        const { instance } = await WebAssembly.instantiate(buffer);
        return instance.exports;
    } catch (err) {
        console.error('Failed to load WASM:', err);
        throw err;
    }
}

window.addEventListener('DOMContentLoaded', async () => {
    try {
        wasmExports = await loadWasm();
        console.log('WASM module loaded successfully');
    } catch (err) {
        alert('Failed to load WASM module. Please check console for details.');
    }
});

async function runOperation(operation) {
    if (!wasmExports) {
        alert('WASM module not loaded yet');
        return;
    }

    let a, b;
    switch (operation) {
        case 'sum':
            a = parseInt(document.getElementById('num1').value);
            b = parseInt(document.getElementById('num2').value);
            document.getElementById('sumResult').textContent = `${wasmExports.sum(a, b)}`;
            break;
        case 'mul':
            a = parseInt(document.getElementById('num3').value);
            b = parseInt(document.getElementById('num4').value);
            document.getElementById('mulResult').textContent = `${wasmExports.mul(a, b)}`;
            break;
        case 'sub':
            a = parseInt(document.getElementById('num5').value);
            b = parseInt(document.getElementById('num6').value);
            document.getElementById('subResult').textContent = `${wasmExports.sub(a, b)}`;
            break;
    }
}