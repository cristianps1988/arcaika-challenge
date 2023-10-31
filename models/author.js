const { Schema, model } = require('mongoose')

const AuthorSchema = Schema({
    nickname: String,
    secUid: {
        type: String,
        unique: true
    },
    uniqueId: String,
    avatar: String,
    signature: String,
    verified: Boolean
})

module.exports = model('Author', AuthorSchema)