const express = require('express');
const app = express();
const port = 3000;
const cors = require('cors');

app.use(cors());

app.use(express.json());

app.get("/",(req,res) => {res.send("hello")});

app.post('/mul/:num1/:num2',(req,res) => {
    let num1 = req.params.num1;
    let num2 = req.params.num2;
    res.send({
        ans: parseInt(num1) * parseInt(num2)
    })
})

app.post('/sum',(req,res) => {
    let r = req.body;
    let sum = Number(r.num1) + Number(r.num2);
    res.send(String(sum))
})

app.post('/diff',(req,res) => {
    let r = req.body;
    let sum = Number(r.num1) - Number(r.num2);
    res.send(String(sum))
})

app.post('/mul',(req,res) => {
    let r = req.body;
    let sum = Number(r.num1) * Number(r.num2);
    res.send(String(sum))
})

app.post('/div',(req,res) => {
    let r = req.body;
    let sum = Number(r.num1) / Number(r.num2);
    res.send(String(sum))
})

app.listen(port);