const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    id : Number,
    username : String,
    password : String
});

const BlogSchema = new mongoose.Schema({
    id : Number,
    title : String,
    content : String,
    userid : Number
});

const UserModel = mongoose.model('users',UserSchema);
const BlogModel = mongoose.model('blogs', BlogSchema)

module.exports = {
    UserModel,
    BlogModel
}