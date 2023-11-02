const { Schema, model } = require('mongoose')

const VideoInfoSchema = Schema({
    videoId: {
        type: String,
        unique: true
    },
    title: String,
    author: {
        type: Schema.Types.ObjectId,
        ref: 'Author'
    },
    videoStats: {
        likes: Number,
        comments: Number,
        views: Number,
        shares: Number
    },
    video: {
        cover: String,
        embed: String
    },
    favorite: Boolean
})

module.exports = model('VideoInfo', VideoInfoSchema)