const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    id: Number,
    username: String,
    password: String
})

const TodoSchema = new mongoose.Schema({
    id: Number,
    content: String,
    userid: Number
})

module.exports = {
    TodoSchema,
    UserSchema
}