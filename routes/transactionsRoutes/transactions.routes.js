const router = require('express').Router()
const Product = require('../../models/Product.model')
const User = require('../../models/User.model')
const Transaction = require('../../models/Transaction.model')

router.post('/get-transactions', (req, res, next) => {
    const { transactions } = req.body
    console.log(transactions)
    Transaction
        .find({ _id: { $in: transactions }, activeTransaction: true })
        .populate('buyer')
        .populate('product')
        .then(transaction => res.status(200).json(transaction))
        .catch(err => next(err))
})

router.post('/start/:product_id/:buyer_id/:seller_id', (req, res, next) => {

    const { product_id, buyer_id, seller_id } = req.params

    Transaction
        .create({ product: product_id, buyer: buyer_id, seller: seller_id })
        .then(transaction => Product.findByIdAndUpdate(product_id, { $addToSet: { buyRequest: transaction._id } }, { new: true }))
        .catch(err => next(err))
})

router.put('/reject/:transaction_id', (req, res, next) => {

    const { transaction_id } = req.params

    Transaction
        .findByIdAndUpdate(transaction_id, { activeTransaction: false }, { new: true })
        .then(() => res.status(200).json('Transaccion rechazada'))
        .catch(err => next(err))
})

router.put('/accept/:transaction_id/:product_id/:buyer_id/:seller_id', (req, res, next) => {

    const { transaction_id, product_id, buyer_id, seller_id } = req.params

    Transaction
        .findByIdAndUpdate(transaction_id, { activeTransaction: false }, { new: true })
        .then(() => {

            const itsBought = User.findByIdAndUpdate(buyer_id, { $addToSet: { purchasedProducts: product_id } }, { new: true })
            const itsSold = User.findByIdAndUpdate(seller_id,
                {
                    $addToSet: { soldProducts: product_id },
                    $pull: { sellingProducts: product_id }
                }
                , { new: true })
            const outStock = Product.findByIdAndUpdate(product_id, { inSale: false }, { new: true })

            const promises = [itsBought, itsSold, outStock]

            return Promise.all(promises)
        })
        .then(() => res.status(200).json('Product sold'))
        .catch(err => next(err))
})


module.exports = router