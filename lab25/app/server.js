const express = require('express');
const { JSONRPCServer } = require("json-rpc-2.0");
const { sum, mul, div, proc } = require('./operations')

const server = new JSONRPCServer();

server.addMethod("sum", sum);
server.addMethod("mul", mul);
server.addMethod("div", div);
server.addMethod("proc", proc);

const app = express();
app.use(express.json());

app.post("/rpc", (req, res) => {
    server.receive(req.body).then((jsonRPCResponse) => {
        if (jsonRPCResponse) {
            res.json(jsonRPCResponse);
        } else {
            res.sendStatus(204);
        }
    });
});

const HOST = 'localhost'
const PORT = 3000
app.listen(PORT, HOST, () => {
    console.log(`server starten on http://${HOST}:${PORT}`)
})