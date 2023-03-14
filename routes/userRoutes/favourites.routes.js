const router = require('express').Router()
const User = require('../../models/User.model')


//IF IS FAVOURITE PRODUCT RETURN TRUE
router.get('/is-favourite-product/:user_id/:product_id', (req, res, next) => {

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
router.put('/addToFavProd/:user_id/:product_id', (req, res, next) => {

    const { user_id, product_id } = req.params

    User
        .findByIdAndUpdate(user_id, { $addToSet: { favouriteProducts: product_id } })
        .then(() => res.status(200).json('El producto se ha añadido a favoritos corectamente'))
        .catch(err => next(err))
})

//DELETE FAVOURITE PRODUCTS
router.put('/removeFromFavProd/:user_id/:product_id', (req, res, next) => {

    const { user_id, product_id } = req.params

    User
        .findByIdAndUpdate(user_id, { $pull: { favouriteProducts: product_id } }, { new: true })
        .then((user) => res.status(200).json('El producto se ha retirado de favoritos corectamente'))
        .catch(err => next(err))
})



//IF IS FAVOURITE SELLER RETURN TRUE
router.get('/is-favourite-seller/:user_id/:seller_id', (req, res, next) => {

    const { user_id, seller_id } = req.params

    User
        .findById(user_id)
        .select({ favouriteSellers: 1 })
        .then(({ favouriteSellers }) => {
            return favouriteSellers.includes(seller_id)
        })
        .then(result => res.status(200).json(result))
        .catch(err => next(err))
})

//ADD FAVOURITE SELLERS 
router.put('/addToFavSel/:user_id/:seller_id', (req, res, next) => {

    const { user_id, seller_id } = req.params

    User
        .findByIdAndUpdate(user_id, { $addToSet: { favouriteSellers: seller_id } })
        .then(() => res.status(200).json('El vendedor se ha añadido a favoritos corectamente'))
        .catch(err => next(err))
})

//DELETE FAVOURITE SELLERS
router.put('/removeFromFavSel/:user_id/:seller_id', (req, res, next) => {

    const { user_id, seller_id } = req.params

    User
        .findByIdAndUpdate(user_id, { $pull: { favouriteSellers: seller_id } }, { new: true })
        .then(() => res.status(200).json('El vendedor se ha retirado de favoritos corectamente'))
        .catch(err => next(err))
})




module.exports = router