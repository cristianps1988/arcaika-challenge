const { Router } = require('express')
const { addNewVideo, getAllVideos, updateVideo, deleteVideo } = require('../controllers/video')

const router = Router()

router.get('/', getAllVideos)
router.post('/newVideo', addNewVideo)
router.put('/:id', updateVideo)
router.delete('/:id', deleteVideo)

module.exports = router;