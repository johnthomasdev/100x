const express = require('express');
const app = express();
const cors = require('cors');
app.use(express.json()); // parses json and make its available for req.body else it would be undefined
app.use(cors());

app.get('/',(req,res) => {
    res.send('hi');
})

app.get('/sum/:num1/:num2',(req,res) => {
    res.send(parseInt(req.params.num1) + parseInt(req.params.num2));
})

app.post('/sum',(req,res) => {
    let n = Number(req.body.num);
    let s = 0
    for(let i = 1; i <= n; i++){
        s += i;
    }
    res.send(s);
})

app.put('/large/:c',(req,res) =>{
    let a = parseInt(req.query.one);
    let b = parseInt(req.body.num);
    let c = parseInt(req.params.c);
    let d = parseInt(req.headers.d);
    res.send(Math.max(a,b,c,d));
})





app.listen(3000);