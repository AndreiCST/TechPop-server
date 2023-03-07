const router = require('express').Router()
const User = require('./../../models/User.model')
const Valoration = require('./../../models/Valoration.model')

router.post('/create/:product_id/:user_id', (req, res, next) => {
    const { user_id, product_id } = req.params
    const { stars, description } = req.body

    Valoration
        .create({ stars, description, product: product_id })
        .then(({ product }) => User.findByIdAndUpdate(user_id, { $addToSet: { valorations: product } }))
        .catch(err => next(err))
})

router.get('/:user_id', (req, res, next) => {
    const { user_id } = req.params

    User
        .findById(user_id)
        .select({ valorations: 1 })
        .then(valorations => res.send(valorations))
        .catch(err => next(err))
})

module.exports = router