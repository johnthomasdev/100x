const zod = require('zod');

const Userobject = zod.object({
    username : zod.string().max(20).min(3),
    password : zod.string().max(20).min(3)
})

const BlogObject = zod.object({
    title : zod.string().max(100).min(1),
    content : zod.string().max(300).min(1)
})

module.exports = {
    Userobject,
    BlogObject
}