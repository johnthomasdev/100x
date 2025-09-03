const express = require('express');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const {PrismaClient} = require('@prisma/client');


const app = express();
const prisma = new PrismaClient();
// const {Pool} = require('pg');

// const pool = new Pool({
//     connectionString: 'postgresql://neondb_owner:npg_rc9ZjhL0EkPe@ep-morning-tooth-a1gpr0ry-pooler.ap-southeast-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require'
// })

// pool.connect().then((conn) => {
//     const app = express();
//     app.use(express.json());
//     app.post("/signup",(req,res) => {
//         conn.query(`INSERT INTO users (username,password) VALUES ('${req.body.username}', '${req.body.password}');`)
//         res.json({
//             message:"User created"
//         })
//     })

//     app.post('/signin',(req,res) => {
//         const {username,password} = req.body;
//         let rows = conn.query(`SELECT * FROM users WHERE username='${username}' AND password = '${password}';`).then(({rows}) => {
            
//         })
//     })

//     app.listen(4000);
// });




