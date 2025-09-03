const express = require('express');
const app = express();
const port = 3000;


app.get('/',(req,res) => {
    res.send("hey there hows it going");
   
});

app.listen(port,() => {
    console.log('Server running on http://localhost:3000');
})