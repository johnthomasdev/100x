const express = require('express');
const app = express();
const cors = require('cors');
const fs = require('fs');
const jwt = require('jsonwebtoken');

app.use(cors());
app.use(express.json());

let file = 'users.json';
let key = 'blingblong';

let reqcount = 0;

// app.use((req,res,next) => {
//     let start = Date.now();
//     res.on('finish', () => { // when response is about to be sent (route is going to finish)
//         let finish = Date.now() - start;
//         console.log(`Time: ${finish}ms, Method: ${req.method}, URL:  ${req.route.path}`)
//     })
//     next(); //Call the next middleware/route
// })

function authMiddleware(req,res,next){
    let {token} = req.headers;
    let decoded = jwt.verify(token,key);
    let username = decoded.username;
    let id = decoded.id;
    fs.readFile(file,'utf-8',(err,data) => {
        let users = JSON.parse(data);
        let f = users.find(i => i.username == username);
        if (f){
            req.username = username;
            req.id = id;
            next()
        }
        else{
            res.send({
                "status":"couldnt find ya"
            })
        }
    })
}


app.post('/signup',(req,res) => {
    let {name,username,password} = req.body;
    fs.readFile(file,'utf-8',(err,data) => {
        let users = JSON.parse(data);
        let f = users.find(i => i.username == username);
        if (f){
            res.json({
                "status":"Account already exists. Try logging in"
            })
        }
        else{
            users.push({
                "id":Math.random(),
                "name":name,
                "username":username,
                "password":password
            });
            fs.writeFile(file,JSON.stringify(users,null,2), () => {
                res.json({
                    "status":"Congrats your account has been made"
                })
            })
        }
    })
})

app.post('/signin',(req,res) => {
    let {username,password} = req.body;
    fs.readFile(file,'utf-8',(err,data) =>{
        let users = JSON.parse(data);
        let f = users.find(i => i.username == username && i.password == password);
        if (f){
            let token = jwt.sign({"username":username,"id":f.id},key);
            res.json({
                "status":"You are logging in.",
                "token":token
            });
        }
        else{
            res.json({
                "status":"Your account doesnt exist or Your username/password is incorrect."
            })
        }
    })
})

app.post("/name",authMiddleware,(req,res) => {
    fs.readFile(file,'utf-8',(err,data) => {
        let users = JSON.parse(data);
        let f = users.find(i => i.username == req.username);
        if (f){
            res.json({
            "name":f.name
            })
        }
        else{
            res.json({
                "status":"what good is a dancing monkey who cannot dance."
            })
        }
        
    })
})

app.post("/showcount",(req,res) => {
    res.json({
        "count":reqcount
    })
})


app.post("/count",(req,res) => {
    let num = req.body.num;
    let sum = 0;
    for(let i = 0; i <= num; i++){
        sum += i;
    }
    res.json({
        "ans":sum
    })
})

app.listen(4000,() => {
    console.log("Server is starting.");
})