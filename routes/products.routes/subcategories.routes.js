const router = require('express').Router()
const Subcategory = require('./../../models/Subcategory.model')

router.post('/subcategory/create', (req, res, next) => {

    const { title, cover } = req.body

    Subcategory
        .create({ title, cover })
        .then(subcategory => res.status(200).json(subcategory))
        .catch(err => next(err))
})

router.delete('/subcategory/delete/:subcategory_id', (req, res, next) => {

    const { subcategory_id } = req.params

    Subcategory
        .findByIdAndDelete(subcategory_id)
        .then(subcategory => {
            res.status(200).json(`La categoria: ${subcategory.title} ha sido eliminada`)
        })
        .catch(err => next(err))
})


module.exports = router