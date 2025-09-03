const zod = require('zod');

const Userobject = zod.object({
    username:zod.string().max(20).min(3),
    password:zod.string().max(20).min(3)
})

const Todoobject = zod.object({
    todo:zod.string()
})

module.exports = {
    Todoobject,
    Userobject
}

