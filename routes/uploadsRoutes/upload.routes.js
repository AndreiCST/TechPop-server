const router = require('express').Router()
const uploader = require('../../middlewares/uploader.middleware')

router.post('/image', uploader.array('imageData'), (req, res) => {
	if (!req.files) {
		res.status(500).json({ errorMessages: 'Error caragndo el archivo' })
		return
	}

	const images = req.files.map((image) => image.path)
	res.json(images)
})

module.exports = router
