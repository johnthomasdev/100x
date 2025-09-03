const { key, mongokey } = require('./config.js')
const jwt = require('jsonwebtoken');
const { UserModel,BlogModel } = require('./models.js')

function authMiddleware(req,res,next){
    let {token} = req.headers;
    let decoded = jwt.verify(token,key);
    let username = decoded.username;
    let id = decoded.id;
    UserModel.findOne({username:username}).then((user) => {
        if (user){
            req.username = username;
            req.id = id;
            next()
        }
        else{
            res.send({
                "status" : "the world is not your oyester"
            })
        }
    })
}

module.exports = {
    authMiddleware
}