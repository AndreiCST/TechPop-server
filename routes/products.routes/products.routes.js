const router = require('express').Router()
const Product = require('../../models/Product.model')

router.get('/get-products', (req, res, next) => {

    Product
        .find()
        .then(elem => res.send(elem))
        .catch(err => next(err))
})

router.post('/create-product', (req, res, next) => {

    const { name, description, price } = req.body

    Product
        .create({ name, description, price })
        .then(elem => res.send(elem))
        .catch(err => next(err))
})

router.post('/edit/:id', (req, res, next) => {

    const { id } = req.params
    const { name, description, images, price, stateOfProduct, inSale, category, subcategory } = req.body

    Product
        .findByIdAndUpdate(id, { name, description, images, price, stateOfProduct, inSale, category, subcategory })
        .then(elem => res.send(elem))
        .catch(err => next(err))
})

router.post('/delete/:id', (req, res, next) => {

    const { id } = req.params

    Product
        .findByIdAndDelete(id)
        .then(elem => res.send(elem))
        .catch(err => next(err))
})

router.get('/:id', (req, res, next) => {

    const { id } = req.params

    Product
        .findById(id)
        .then(elem => res.send(elem))
        .catch(err => next(err))
})

module.exports = router