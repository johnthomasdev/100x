const express = require('express');
const app = express();
const cors = require('cors');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');

const { key, mongokey } = require('./config.js')
const { Userobject, BlogObject } = require('./errorhandling.js');
const { UserModel, BlogModel } = require('./models.js');
const { authMiddleware } = require('./middleware.js');

mongoose.connect(mongokey);

app.use(cors());
app.use(express.json());

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
})

app.post("/create-blog",authMiddleware,(req,res) => {
    const response = BlogObject.safeParse(req.body);
    if (!response.success){
        res.json({
                "status": "Error Occurred"
        })
    }
    else{
        let {title,content} = req.body;
        let bid = Math.random()
        BlogModel.create({
            "id":bid,
            "title":title,
            "content":content,
            "userid":req.id 
        })
        res.json({
            "status":"blog added",
            "id": bid
        })
    }
})


app.post('/delete-blog',authMiddleware,(req,res) =>{
    let {id} = req.body;
    BlogModel.deleteOne({id:id}).then((blogs) => {
        res.json({
            "status":"deleted"
        })
    })
})

app.post('/view-mine',authMiddleware,(req,res) => {
    BlogModel.find({userid:req.id}).then(blogs => {
        if (blogs.length > 0){
            res.json({
                "blogs":blogs,
                "status": "blogs yay"
            })
        }
        else{
            res.json({
                "status":"no blogs for you :("
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
    UserModel.find({username:username}).then((users) => {
        if (users){
            BlogModel.findOne({id:id}).then((blogs) => {
                res.json({
                    "title":blogs.title,
                    "content":blogs.content
                })
            })
        }
    })
})

app.listen(4000,() => {
    console.log("Server is starting.");
})