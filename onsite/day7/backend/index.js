const jwt = require('jsonwebtoken');
const express = require('express');
const cors = require('cors');
const app = express();
const fs = require('fs');

const path = require('path');
app.use(express.static(path.join(__dirname, '../frontend')));

let file = 'users.json';
let blogfile = 'blogs.json';
let key = 'bingbangbing';

app.use(cors());
app.use(express.json());

// let token = jwt.sign("john","123random"); //"john" is the payload "123random" is the key
// console.log(token);

// let exists = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImEiLCJpZCI6MC4yNTk2MDU0MjU5OTUwODM5NiwiaWF0IjoxNzUxMDE5MTk1fQ.rm4_Q2XY00B22u5PaGOG2ArYg8K9edQZm81DCjRdnCY";
// console.log(jwt.verify(exists,"123random"));

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

app.post('/test',(req,res)=>{
    let {token} = req.body;
    let decoded = jwt.verify(token, key);
    res.json({decoded});
})

// We take the token from cookie and then we decrypt to get username and then we use 

app.post("/create-blog",(req,res) => {
    let {token} = req.headers; // you get this from the header
    let {title,content} = req.body;
    let  decoded = jwt.verify(token, key);
    let username = decoded.username;
    let id = decoded.id;
    fs.readFile(file,'utf-8',(err,data) => {
        let users = JSON.parse(data);
        let us = users.find(i => i.username == username);
        if(us){
            fs.readFile(blogfile,'utf-8',(berror,bdata) => {
                let blogs = JSON.parse(bdata);
                let bid = Math.random()
                blogs.push({
                    "id":bid,
                    "title":title,
                    "content":content,
                    "userid":id //assigning user's id to the id of the blog
                });
                fs.writeFile(blogfile,JSON.stringify(blogs,null,2),() => {
                    res.json({
                        "status":"blog added",
                        "id": bid
                    })
                })
            })  
        }
        else{
            res.json({
                "status":"error user not found",
                "token":token
            })
        }
    })
})

app.post('/delete-blog',(req,res) =>{
    let {token} = req.headers;
    let {id} = req.body;
    let  decoded = jwt.verify(token, key);
    let username = decoded.username;
    let bid = decoded.id;
    fs.readFile(file,'utf-8',(err,data) => {
        let users = JSON.parse(data);
        let us = users.find(i => i.username == username);
        if(us){
            fs.readFile(blogfile,'utf-8',(err,data) => {
                let blogs = JSON.parse(data);
                let afterdelete = blogs.filter(b => b.id != id)
                fs.writeFile(blogfile,JSON.stringify(afterdelete,null,2),() => {
                    res.json({
                        "status":"deleted"
                    })
                })
            })
        }
    })
})


app.post('/view-mine',(req,res) => {
    let {token} = req.headers;
    let  decoded = jwt.verify(token, key);
    let username = decoded.username;
    let id = decoded.id;
    fs.readFile(file,'utf-8',(err,data) => {
        let users = JSON.parse(data);
        let us = users.find(i => i.username == username);
        if(us){
            fs.readFile(blogfile,'utf-8',(err,data) => {
                let blogs = JSON.parse(data);
                let urblogs = blogs.filter(b => b.userid == id);
                if (urblogs.length > 0){
                    res.json({
                        "blogs":urblogs,
                        "status":"blogs yay"
                    });
                }
                else{
                    res.json({
                        "status":"no blogs for you :("
                    })
                }
            })
        }
    })
})

app.post("/view-all",(req,res) => {
    let {token} = req.headers;
    let  decoded = jwt.verify(token, key);
    let username = decoded.username;
    let id = decoded.id;
    fs.readFile(file,'utf-8',(err,data) => {
        let users = JSON.parse(data);
        let us = users.find(i => i.username == username);
        if(us){
            fs.readFile(blogfile,'utf-8',(err,data) => {
                let blogs = JSON.parse(data);
                res.json({
                    "blogs": blogs,
                    "status":"found all"
                });
            })
        }
    })
    
})

app.get('/view-one/:id',(req,res) => {
    let token = req.query.token;
    let id = req.params.id;
    let decoded = jwt.verify(token, key);
    let username = decoded.username;
    let bid = decoded.id;
    fs.readFile(file,'utf-8',(err,data) => {
        let users = JSON.parse(data);
        let us = users.find(i => i.username == username);
        if(us){
            fs.readFile(blogfile,'utf-8',(err,data) => {
                let blogs = JSON.parse(data);
                let urblogs = blogs.find(b => b.id == id);
                res.send(`
                    <html>
                        <head>
                            <title>
                                ${urblogs.title}
                            </title>
                        </head>
                        <body style = "display: flex; flex-direction: column; align-items: center;font-size: 25px;text-align: center;background-color: #6a6a6a;color:white;padding-top: 15%;text-shadow: 2px 2px 4px #000000;text-align: center;">
                            <div class = 'title' style = "border: 2px solid white;display:inline-block;min-width: 150px;text-align: center;margin:10px;background-color: #181818;"> ${urblogs.title} </div>
                            <div class = 'content' style = "border: 2px solid white;display:block;min-width: 150px;min-height: 100px;text-align: center;margin:10px;background-color: #181818;">${urblogs.content} </div>
                           <button style="margin-top: 20px;font-size: large;color:green;margin-left:10px;margin-top:10px" onclick="window.location.href='http://localhost:3000/blog.html'">Go Back</button>
                        </body>
                    </html>
                `)
            })
        }
    })
})


app.listen(4000,() =>{
    console.log("Server is ON!!!")
})


// blogs.forEach((blog)=>{
// //append some xyz 
// <div><button onClick={()=>{
//     window.location.href="/view-one/"+blog.id
// }}></button></div>
// })