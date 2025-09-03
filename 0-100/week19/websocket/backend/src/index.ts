import WebSocket, {WebSocketServer} from "ws";
// import http from 'http';
import express from  'express';

// const server = http.createServer(function(request:any,response:any){
//     console.log((new Date()) + "Recieved Request for " + request.url);
//     response.end("hi there");
// })

// const wss = new WebSocketServer({server});

const app = express();

app.get("/",(req,res)=> {
    res.send("Hello World!");
})

const httpServer = app.listen(8080, () => {
    console.log("Server is listening on port 8080");
});

const wss = new WebSocketServer({server: httpServer});

let count = 0;

wss.on('connection',function connection(ws){
    ws.on('error',console.error);
    ws.on('message',function message(data,isBinary){
        wss.clients.forEach(function each(client){
            if (client.readyState === WebSocket.OPEN){
                client.send(data,{binary: isBinary})
            }
        })
    });
    //console.log("user connected: ", ++count)
    //ws.send("Hello! Message from server!");
});

// server.listen(8080,function(){
//     console.log((new Date()) + "Server is listening on port 8080");
// });