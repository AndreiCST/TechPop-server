const router = require('express').Router()
const Product = require('../../models/Product.model')
const User = require('../../models/User.model')

router.get('/get-products', (req, res, next) => {

    Product
        .find({ activeProduct: true, inSale: true })
        .select({ name: 1, price: 1, images: 1 })
        .then(products => res.status(200).json(products))
        .catch(err => next(err))
})

router.get('/search/:searchString', (req, res, next) => {

    const { searchString } = req.params

    Product
        .find({
            $or: [
                { name: { $regex: searchString, $options: 'i' } },
                { description: { $regex: searchString, $options: 'i' } }
            ],
            activeProduct: true,
            inSale: true
        })
        .then(products => res.status(200).json(products))
        .catch(err => console.log(err))
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

router.put('/edit/:product_id', (req, res, next) => {

    const { product_id } = req.params
    const { name, description, price, stateOfProduct, category, subcategory } = req.body

    // const productData = {}

    // name ? productData.name = name : undefined
    // description ? productData.description = description : undefined
    // price ? productData.price = price : undefined
    // stateOfProduct ? productData.stateOfProduct = stateOfProduct : undefined
    // category ? productData.category = category : undefined

    // subcategory ? productData.subcategory = subcategory : undefined
    // images ? productData.images = images : undefined

    Product
        .findByIdAndUpdate(product_id, { name, description, price, stateOfProduct, category, subcategory })
        .then(() => res.status(200).json('El producto se ha editado'))
        .catch(err => next(err))
})

router.put('/delete/:product_id', (req, res, next) => {

    const { product_id } = req.params

    Product
        .findByIdAndUpdate(product_id, { activeProduct: false }, { new: true })
        .then(() => res.status(200).json('El producto se ha borrado corectamente'))
        .catch(err => next(err))
})

router.get('/:product_id', (req, res, next) => {

    const { product_id } = req.params

    Product
        .findById(product_id)
        .populate({
            path: 'owner',
            select: '_id firstName lastName valorations'
        })
        .then(product => res.status(200).json(product))
        .catch(err => next(err))
})



module.exports = router