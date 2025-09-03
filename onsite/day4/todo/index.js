const express = require('express');
const app = express();
const cors = require('cors');
const fs = require('fs');
app.use(express.json());
app.use(cors());

file = 'todofile.txt'

let todo = [];
let i = 0;

app.get('/',(req,res) => {
    res.send('hello world');
})

app.post('/add',(req, res) => {
    todo.push(req.body.todo);
    fs.appendFile(file,req.body.todo + "\n", () => {
        res.send(i.toString());
        i += 1;
        console.log(todo);
    });
});

app.post('/del',async (req,res) => {
    todo.splice(req.body.todo, 1);
    res.send(i.toString());
    i -= 1;
    console.log(todo);
})

app.post('/show',(req,res) => {
    res.send(todo);
})

app.listen(3000);