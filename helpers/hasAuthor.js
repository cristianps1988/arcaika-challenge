const { default: axios } = require('axios');
const { response } = require('express');
const TikAPI = require('tikapi');
const VideoInfo = require('../models/video');
const Author = require('../models/author');
require('dotenv').config();

const hasAuthor = async (author) => {
    const authorExists = await Author.findOne({ secUid: author.secUid })

    if (!authorExists) {
        const newAuthor = new Author({
            nickname: author.nickname,
            secUid: author.secUid,
            uniqueId: author.uniqueId,
            avatar: author.avatarThumb,
            signature: author.signature,
            verified: author.verified
        })
        newAuthor.save()
        return newAuthor
    }
    const existAuthor = authorExists
    return existAuthor

}

module.exports = { hasAuthor };