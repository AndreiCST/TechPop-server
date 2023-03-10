const router = require('express').Router()
const Category = require('./../../models/Category.model')
const Subcategory = require('./../../models/Subcategory.model')


router.post('/category/create', (req, res, next) => {

    const { title, cover, subcategory } = req.body

    Category
        .create({ title, cover, subcategory })
        .then(category => res.status(200).json(category))
        .catch(err => next(err))
})


router.put('/category/edit/:category_id', (req, res, next) => {

    const { category_id } = req.params
    const { title, cover, subcategory } = req.body

    Category
        .findByIdAndUpdate(category_id, { title, cover, $addToSet: { subcategory } })
        .then(category => res.status(200).json(category))
        .catch(err => next(err))
})


router.delete('/category/delete/:category_id', (req, res, next) => {

    const { category_id } = req.params

    Category
        .findByIdAndDelete(category_id)
        .then(category => {
            res.status(200).json(`La categoria: ${category.title} ha sido eliminada`)
        })
        .catch(err => next(err))
})


module.exports = router