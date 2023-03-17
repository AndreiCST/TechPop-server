const router = require('express').Router()
const User = require('../../models/User.model')
const Valoration = require('../../models/Valoration.model')
const average = require('../../utils/average')

router.put('/create/:product_id/:user_id/:reviewer_id', (req, res, next) => {
    const { user_id, product_id, reviewer_id } = req.params
    const { stars, description } = req.body

    Valoration
        .create({ stars, description, product: product_id, reviewer: reviewer_id })
        .then(({ _id }) => {
            const promises = [
                User.findByIdAndUpdate(user_id, { $addToSet: { 'valorations.allValorations': _id } }, { new: true }),
                User.findById(user_id).select({ 'valorations.allValorations': 1 }).populate('valorations.allValorations')
            ]

            return Promise.all(promises)
        })
        .then(results => {
            const listOfValorations = results[1].valorations.allValorations.map(elem => elem.stars)
            const avgValoration = average(listOfValorations)

            return User.findByIdAndUpdate(user_id, { 'valorations.avgValoration': avgValoration })
        })
        .then(() => res.status(200).json('La valoracion se ha añadido'))
        .catch(err => next(err))
})

router.get('/:valoration_id', (req, res, next) => {
    const { valoration_id } = req.params

    Valoration
        .findById(valoration_id)
        .then(elm => res.status(200).json(elm))
        .catch(err => next(err))

})

module.exports = router