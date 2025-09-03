/*

Do npm init -y
npm install express @types/express
tsc -b
node dist/index.js  (cause read tsconfig.json)


*/


import express, { request } from "express";

const app = express();

let requestCount = 0;

app.use(function(req:express.Request,res:express.Response,next:express.NextFunction){
    requestCount++;
    next();
})

app.get("/",(req:express.Request,res:express.Response) => {
    res.send("Hello world");
})

app.get("/count",(req:express.Request,res:express.Response) => {
    res.json({
        requestCount
    })
})

app.listen(3000,() =>{
    console.log("Server is running on port 3000");
})