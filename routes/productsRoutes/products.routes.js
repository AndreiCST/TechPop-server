const router = require('express').Router()
const Product = require('../../models/Product.model')
const User = require('../../models/User.model')

router.get('/get-products', (req, res, next) => {

    Product
        .find()
        .select({ name: 1, price: 1, images: 1 })
        .then(products => res.status(200).json(products))
        .catch(err => next(err))
})

router.post('/create-product/:user_id', (req, res, next) => {
    const { user_id } = req.params
    const { name, description, price, stateOfProduct, images, category, subcategory } = req.body

    const newProd = {
        name,
        description,
        price,
        stateOfProduct,
        images,
        category,
        subcategory,
        owner: user_id
    }

    // stateOfProduct ? newProd.stateOfProduct = stateOfProduct : undefined
    // category ? newProd.category = category : undefined
    // subcategory ? newProd.subcategory = subcategory : undefined

    Product
        .create(newProd)
        .then(product => {
            User
                .findByIdAndUpdate(user_id, { $addToSet: { sellingProducts: product._id } }, { new: true })
                .then(res.status(200).json('El producto se ha creado'))
                .catch(err => next(err))
        })
        .catch(err => next(err))
})

router.post('/edit/:product_id', (req, res, next) => {

    const { product_id } = req.params
    const { name, description, price, stateOfProduct, images, category, subcategory } = req.body

    const updateProduct = {}

    name ? updateProduct.name = name : undefined
    description ? updateProduct.description = description : undefined
    price ? updateProduct.price = price : undefined
    stateOfProduct ? updateProduct.stateOfProduct = stateOfProduct : undefined
    category ? updateProduct.category = category : undefined

    subcategory ? updateProduct.subcategory = subcategory : undefined
    images ? updateProduct.images = images : undefined

    Product
        .findByIdAndUpdate(product_id, updateProduct)
        .then(() => res.status(200).json('El producto se ha editado'))
        .catch(err => next(err))
})

router.post('/delete/:product_id', (req, res, next) => {

    const { product_id } = req.params

    Product
        .findByIdAndDelete(product_id)
        .then(() => res.status(200).json('El producto se ha borrado corectamente'))
        .catch(err => next(err))
})

router.get('/:product_id', (req, res, next) => {

    const { product_id } = req.params

    Product
        .findById(product_id)
        .populate('owner')
        .then(product => res.status(200).json(product))
        .catch(err => next(err))
})

router.put('/addToFav/:product_id', (req, res, next) => {

    const { product_id } = req.params
    const { user_id } = req.body

    User
        .findByIdAndUpdate(user_id, { $addToSet: { favouriteProducts: product_id } })
        .then(() => res.status(200).json('El producto se ha añadido a favoritos corectamente'))
        .catch(err => next(err))
})

// router.put('/removeFromFav/:product_id', (req, res, next) => {

//     const { product_id } = req.params
//     const { user_id } = req.body



//     User
//         .findByIdAndUpdate(user_id, { $pull: { favouriteProducts: product_id } })
//         .then(() => res.status(200).json('El producto se ha eliminado de favoritos corectamente'))
//         .catch(err => next(err))
// })

module.exports = router