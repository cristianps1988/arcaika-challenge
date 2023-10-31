const { default: axios } = require('axios');
const { response } = require('express');
const TikAPI = require('tikapi');
const VideoInfo = require('../models/video');
const Author = require('../models/author');
const { hasAuthor } = require('../helpers/hasAuthor')
require('dotenv').config();

const api = TikAPI(process.env.TIKAPI_KEY);

const getAllVideos = async (req, res = response) => {
    try {
        const videos = await VideoInfo.find().populate('author')
        res.json({
            videos
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            msg: 'Error al obtener los videos'
        })
    }
}

const addNewVideo = async (req, res = response) => {
    const videoID = req.body.videoUrl.split('/')[req.body.videoUrl.split('/').length - 1]

    try {
        let response = await api.public.video({
            id: videoID,
        })
        const { desc, author, id, stats, video } = response.json.itemInfo.itemStruct
        const url = `https://www.tiktok.com/oembed?url=https://www.tiktok.com/@${author.uniqueId}/video/${id}`

        const videoExist = await VideoInfo.findOne({ videoId: id })

        if (videoExist) {
            return res.status(400).json({
                msg: 'El video ya existe en la base de datos'
            })
        }

        const { _id } = await hasAuthor(author)
        const { data } = await axios.get(url)

        const newVideo = new VideoInfo({
            videoId: id,
            title: desc,
            author: _id,
            videoStats: {
                likes: stats.diggCount,
                comments: stats.commentCount,
                views: stats.playCount,
                shares: stats.shareCount
            },
            video: {
                cover: video.cover,
                embed: data.html
            }
        })
        newVideo.save()

        res.json({
            video: newVideo
        })

    } catch (error) {
        console.log(error)
        res.status(500).json({
            msg: 'Error al obtener el video'
        })
    }

}

const updateVideo = async (req, res = response) => {
    const videoId = req.params.id
    try {
        const video = await VideoInfo.findById(videoId)
        if (!video) {
            return res.status(404).json({
                msg: 'El video no existe'
            })
        }
        const newVideo = req.body
        const videoUpdated = await VideoInfo.findByIdAndUpdate(videoId, newVideo, { new: true })

        res.json({
            video: videoUpdated
        })

    } catch (error) {
        console.log(error)
        res.status(500).json({
            msg: 'Error al actualizarel video'
        })
    }
}

const deleteVideo = async (req, res = response) => {
    const videoId = req.params.id

    try {
        const video = await VideoInfo.findById(videoId)
        if (!video) {
            return res.status(404).json({
                msg: 'El video no existe'
            })
        }
        const videoDeleted = await VideoInfo.findByIdAndDelete(videoId)
        res.json({
            video: videoDeleted
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            msg: 'Error al eliminar el video'
        })
    }
}

module.exports = {
    addNewVideo,
    getAllVideos,
    updateVideo,
    deleteVideo,
}