const express = require('express');
const { WebSocketServer } = require('ws');

const app = express();
const port = 3000;

const wss  = new WebSocketServer({server: app});
wss.on('connection',(ws) => {
    
});

app.listen(port);

