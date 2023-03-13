const router = require('express').Router()
const User = require('../../models/User.model')


//FAVOURITE PRODUCTS
router.get('/is-favourite/:user_id/:product_id', (req, res, next) => {

    const { user_id, product_id } = req.params

    User
        .findById(user_id)
        .select({ favouriteProducts: 1 })
        .then(({ favouriteProducts }) => {
            return favouriteProducts.includes(product_id)
        })
        .then(result => res.status(200).json(result))
        .catch(err => next(err))
})

//ADD FAVOURITE PRODUCTS 
router.put('/addToFavProd/:product_id', (req, res, next) => {

    const { product_id } = req.params
    const { user_id } = req.body

    User
        .findByIdAndUpdate(user_id, { $addToSet: { favouriteProducts: product_id } })
        .then(() => res.status(200).json('El producto se ha añadido a favoritos corectamente'))
        .catch(err => next(err))
})

//DELETE FAVOURITE PRODUCTS
router.delete('/removeFromFavPro/:product_id', (req, res, next) => {

    const { product_id } = req.params
    const { user_id } = req.body

    User
        .findByIdAndUpdate(user_id, { $pull: { favouriteProducts: product_id } }, { new: true })
        .then((user) => res.status(200).json('El producto se ha retirado de favoritos corectamente'))
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
router.put('/addToFavSel/:seller_id', (req, res, next) => {

    const { seller_id } = req.params
    const { user_id } = req.body

    User
        .findByIdAndUpdate(user_id, { $addToSet: { favouriteSellers: seller_id } })
        .then(() => res.status(200).json('El vendedor se ha añadido a favoritos corectamente'))
        .catch(err => next(err))
})

//DELETE FAVOURITE SELLERS
router.delete('/removeFromFavSel/:product_id', (req, res, next) => {

    const { seller_id } = req.params
    const { user_id } = req.body

    User
        .findByIdAndUpdate(user_id, { $pull: { favouriteSellers: seller_id } }, { new: true })
        .then((user) => res.status(200).json('El vendedor se ha retirado de favoritos corectamente'))
        .catch(err => next(err))
})




module.exports = router