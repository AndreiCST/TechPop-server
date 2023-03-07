const router = require('express').Router()
const User = require('./../../models/User.model')


//FAVOURITE PRODUCTS
router.get('/favouriteproducts/:user_id', (req, res, next) => {

    const { user_id } = req.params

    User
        .findById(user_id)
        .populate("favouriteProducts")
        .then(user => res.status(200).json(user.favouriteProducts))
        .catch(err => next(err))
})

//ADD FAVOURITE PRODUCTS 
router.put('/favouriteproducts/add/:user_id/:product_id', (req, res, next) => {

    const { user_id, product_id } = req.params

    User
        .findByIdAndUpdate(user_id, { $addToSet: { favouriteProducts: product_id } }, { new: true })
        .then((user) => res.status(200).json(user))
        .catch(err => next(err))
})

//DELETE FAVOURITE PRODUCTS
router.delete('/favouriteproducts/delete/:user_id/:product_id', (req, res, next) => {

    const { user_id, product_id } = req.params

    User
        .findByIdAndUpdate(user_id, { $pull: { favouriteProducts: product_id } }, { new: true })
        .then((user) => res.status(200).json(user))
        .catch(err => next(err))
})



//FAVOURITE SELLERS
router.get('/favouritesellers/:user_id', (req, res, next) => {

    const { user_id } = req.params

    User
        .findById(user_id)
        .populate("favouriteSellers")
        .then(user => res.status(200).json(user.favouriteSellers))
        .catch(err => next(err))
})

//ADD FAVOURITE SELLERS
router.put('/favouritesellers/add/:user_id/:seller_id', (req, res, next) => {

    const { user_id, seller_id } = req.params

    User
        .findByIdAndUpdate(user_id, { $addToSet: { favouriteSellers: seller_id } }, { new: true })
        .then((user) => res.status(200).json(user))
        .catch(err => next(err))
})

//DELETE FAVOURITE SELLERS
router.delete('/favouritesellers/delete/:user_id/:seller_id', (req, res, next) => {

    const { user_id, seller_id } = req.params

    User
        .findByIdAndUpdate(user_id, { $pull: { favouriteSellers: seller_id } }, { new: true })
        .then((user) => res.status(200).json(user))
        .catch(err => next(err))
})


module.exports = router