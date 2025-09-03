const express = require('express');
const app = express();
const cors = require('cors');
// const fs = require('fs');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
// const zod = require('zod');

const { Userobject, Todoobject } = require('./errorhandling.js');
const { UserSchema, TodoSchema } = require('./models.js');

mongoose.connect('enter your mongodb url')

// const users = mongoose.model('users',{name:String});
// const peeps = new users({name:"John"});
// peeps.save().then(() => console.log('Users collection connected'))


const UserModel = mongoose.model('users',UserSchema);
const TodoModel = mongoose.model('todo',TodoSchema)

app.use(cors());
app.use(express.json());

// let file = 'users.json';
// let todofile = 'todo.json';
let key = 'blingblong';

app.post('/signup',(req,res) => {
    const response = Userobject.safeParse(req.body);
    if (!response.success){
        res.json({
                "status": "Error occurred"
        })
    }
    else{
        let {username,password} = req.body;
        UserModel.findOne({username:username}).then((user) =>{
            if (user){
                res.json({
                    "status":"Account already exists. Try logging in"
                })
            }
            else{
                UserModel.create({
                    id:Math.random(),
                    username:username,
                    password:password
                })
                res.json({
                    "status":"Congrats your account has been made"
                })
            }
        })

    }
    
    // fs.readFile(file,'utf-8',(err,data) => {
    //     let users = JSON.parse(data);
    //     let f = users.find(i => i.username == username);
    //     if (f){
    //         res.json({
    //             "status":"Account already exists. Try logging in"
    //         })
    //     }
    //     else{
    //         users.push({
    //             "id":Math.random(),
    //             "username":username,
    //             "password":password
    //         });
    //         fs.writeFile(file,JSON.stringify(users,null,2), () => {
    //             res.json({
    //                 "status":"Congrats your account has been made"
    //             })
    //         })
    //     }
    // })
})

app.post('/signin',(req,res) => {
    const response = Userobject.safeParse(req.body);
    if (!response.success){
        res.json({
                "status": "Error Occurred"
        })
    }
    else{
        let {username,password} = req.body;
        UserModel.findOne({username:username, password:password}).then((user) =>{
            if (user){
                let token = jwt.sign({"username":username,"id":user.id},key);
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
    }
    // fs.readFile(file,'utf-8',(err,data) =>{
    //     let users = JSON.parse(data);
    //     let f = users.find(i => i.username == username && i.password == password);
    //     if (f){
    //         let token = jwt.sign({"username":username,"id":f.id},key);
    //         res.json({
    //             "status":"You are logging in.",
    //             "token":token
    //         });
    //     }
    //     else{
    //         res.json({
    //             "status":"Your account doesnt exist or Your username/password is incorrect."
    //         })
    //     }
    // })
})

app.post("/create-todo",(req,res) => {
    let {token} = req.headers; // you get this from the header
    let {content} = req.body;
    let  decoded = jwt.verify(token, key);
    let username = decoded.username;
    let id = decoded.id;
    UserModel.findOne({username:username}).then((user) =>{
        if (user){
            let bid = Math.random()
            TodoModel.create({
                "id":bid,
                "content":content,
                "userid":id 
            })
            res.json({
                "status":"todo added",
                "id": bid
            })
        }
        else{
            res.json({
                "status":"error user not found",
                "token":token
            })
        }
    })
    // fs.readFile(file,'utf-8',(err,data) => {
    //     let users = JSON.parse(data);
    //     let us = users.find(i => i.username == username);
    //     if(us){
    //         fs.readFile(todofile,'utf-8',(berror,bdata) => {
    //             let todos = JSON.parse(bdata);
    //             let bid = Math.random()
    //             todos.push({
    //                 "id":bid,
    //                 "content":content,
    //                 "userid":id //assigning user's id to the id of the todo
    //             });
    //             fs.writeFile(todofile,JSON.stringify(todos,null,2),() => {
    //                 res.json({
    //                     "status":"todo added",
    //                     "id": bid
    //                 })
    //             })
    //         })  
    //     }
    //     else{
    //         res.json({
    //             "status":"error user not found",
    //             "token":token
    //         })
    //     }
    // })
})

app.post('/delete-todo',(req,res) =>{
    let {token} = req.headers;
    let {id} = req.body;
    let decoded = jwt.verify(token, key);
    let username = decoded.username;
    let bid = decoded.id;
    UserModel.findOne({username:username}).then((user) =>{
        if (user){
            TodoModel.deleteOne({id:id}).then((todos) => {
                res.json({
                    "status":"deleted"
                })
            })
        }
    })


    // fs.readFile(file,'utf-8',(err,data) => {
    //     let users = JSON.parse(data);
    //     let us = users.find(i => i.username == username);
    //     if(us){
    //         fs.readFile(todofile,'utf-8',(err,data) => {
    //             let todos = JSON.parse(data);
    //             let afterdelete = todos.filter(b => b.id != Number(id))
    //             fs.writeFile(todofile,JSON.stringify(afterdelete,null,2),() => {
    //                 res.json({
    //                     "status":"deleted"
    //                 })
    //             })
    //         })
    //     }
    // })
})

app.post('/view-mine',(req,res) => {
    let {token} = req.headers;
    let  decoded = jwt.verify(token, key);
    let username = decoded.username;
    let id = decoded.id;
    UserModel.findOne({username:username}).then((user) =>{
        if (user){
            TodoModel.find({userid:id}).then(todos => {
                if (todos.length > 0){
                    res.json({
                        "todos":todos,
                        "status": "todos yay"
                    })
                }
                else{
                    res.json({
                        "status":"no todos for you :("
                    })
                }
            })
        }
    })



    // fs.readFile(file,'utf-8',(err,data) => {
    //     let users = JSON.parse(data);
    //     let us = users.find(i => i.username == username);
    //     if(us){
    //         fs.readFile(todofile,'utf-8',(err,data) => {
    //             let todos = JSON.parse(data);
    //             let urtodos = todos.filter(b => b.userid == id);
    //             if (urtodos.length > 0){
    //                 res.json({
    //                     "todos":urtodos,
    //                     "status":"todos yay"
    //                 });
    //             }
    //             else{
    //                 res.json({
    //                     "status":"no todos for you :("
    //                 })
    //             }
    //         })
    //     }
    // })
})

app.listen(4000,() => {
    console.log("Server is starting.");
})
