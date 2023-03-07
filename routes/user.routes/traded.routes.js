const router = require('express').Router()
const User = require('./../../models/User.model')

router.get('/selling/:user_id', (req, res, next) => {
    const { user_id } = req.params

    User
        .findById(user_id)
        .select({ sellingProducts: 1 })
        .then(products => res.send(products))
        .catch(err => next(err))
})


router.put('/selling/add/:user_id/:product_id', (req, res, next) => {
    const { user_id, product_id } = req.params

    User
        .findByIdAndUpdate(user_id, { $addToSet: { sellingProducts: product_id } })
        .then(() => res.send('el producto se a añadido'))
        .catch(err => next(err))
})


router.get('/sold/:user_id', (req, res, next) => {
    const { user_id } = req.params

    User
        .findById(user_id)
        .select({ soldProducts: 1 })
        .then(products => res.send(products))
        .catch(err => next(err))
})


router.put('/sold/add/:user_id/:product_id', (req, res, next) => {
    const { user_id, product_id } = req.params

    User
        .findByIdAndUpdate(user_id, { $addToSet: { soldProducts: product_id } })
        .then(() => res.send('el producto se a añadido'))
        .catch(err => next(err))
})


router.get('/purchased/:user_id', (req, res, next) => {
    const { user_id } = req.params

    User
        .findById(user_id)
        .select({ purchasedProducts: 1 })
        .then(products => res.send(products))
        .catch(err => next(err))
})


router.put('/purchased/add/:user_id/:product_id', (req, res, next) => {
    const { user_id, product_id } = req.params

    User
        .findByIdAndUpdate(user_id, { $addToSet: { purchasedProducts: product_id } })
        .then(() => res.send('el producto se a añadido'))
        .catch(err => next(err))
})


module.exports = router