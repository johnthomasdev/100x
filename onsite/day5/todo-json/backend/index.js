const express = require('express');
const app = express();
const cors = require('cors');
const fs = require('fs');


let file = 'todo.json'

app.use(cors());
app.use(express.json());

app.post('/',(req,res) => {
    res.send('Hey you found me.');
})

app.post('/signup',(req,res) => {
    let {username,password} = req.body;
    const newuser = {username,password};
    fs.readFile(file,'utf-8',(err,data) => {
        let users = JSON.parse(data);
        let flag = 0;
        for(let user of users){
            if (user.username == username){
                flag = 1;
            }
        }
        if (flag != 1){
            users.push(newuser);
            fs.writeFile(file,JSON.stringify(users,null,2), () => {
                res.json({
                'status':'Congrats on your new account you can now log in.'
                })
            })
        }
        else{
            res.json({
                'status':'You already exist, try logging in.'
            })
        }
        
    })
})

app.post('/signin',(req,res) => {
    let {username,password} = req.body;
    fs.readFile(file,'utf-8',(err,data) => {
        let users = JSON.parse(data);
        let flag = 0
        for(let user of users){
            if (user.username == username && user.password == password){
                let token = Math.random();
                user.token = token
                fs.writeFile(file,JSON.stringify(users,null,2), () => {
                    res.json({
                        'status':'You are logging in.',
                        'token':token
                    })
                })
                flag = 1;
            }
        }
        if (flag == 0){
            res.json({
                'status':'Your account doesnt exist try signing up.'
            })
        }
    })
})

app.post('/logout',(req,res) => {
    let {token} = req.body;
    fs.readFile(file,'utf-8',(err,data) => {
        let users = JSON.parse(data);
        for(let user of users) {
            if(user.token == token){
                delete user.token;
            }
        }
        fs.writeFile(file,JSON.stringify(users,null,2),() => {
            res.json({
                "status":"logging out"
            })
        })
    })
})

app.post('/add-todo',(req,res) => {
    let {todo,cookie} = req.body;
    fs.readFile(file,'utf-8',(err,data) =>{
        let users = JSON.parse(data);
        let us = users.find(i => i.token == cookie); // same as [i for i in range() if i.token == cookie]
        if(us){
            if (!us.todo){us.todo = [];}
            us.todo.push(todo);
            fs.writeFile(file,JSON.stringify(users,null,2),() => {
                res.json({
                    "status":"Todo added",
                    "index":us.todo.length - 1
                })
            })
        }
        else{
            res.json({
                "status":'Invalid cookie'
            })
        }
    })
})

app.post('/delete-todo',(req,res) => {
    let {index,cookie} = req.body;
    fs.readFile(file,'utf-8',(err,data) => {
        let users = JSON.parse(data);
        let us = users.find(i => i.token == cookie);
        if (us){
            us.todo = us.todo.filter((item,ind) => ind != index); //Loops through item , index
            fs.writeFile(file,JSON.stringify(users,null,2),() => {
                res.json({
                    "status":"deleted",
                })
            })
        }
        else{
            res.json({
                'status':'Invalid cookie'
            })
        }
    })
})


app.post('/fetch',(req,res) => {
    let {cookie} = req.body;
    fs.readFile(file,'utf-8',(err,data) => {
        let users = JSON.parse(data);
        let us = users.find(i => i.token == cookie);
        if (us){
            res.json({
                "status":"success",
                "todo": us.todo || []
            })
        }
        else{
            res.json({
                "status":"failed"
            })
        }
    })
})

app.listen(3000);