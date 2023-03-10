const router = require('express').Router()
const Wallet = require('../../models/Wallet.model')
const User = require('../../models/User.model')
const Transaction = require('../../models/Transaction.model')
const Product = require('../../models/Product.model')


router.get('/:user_id', (req, res, next) => {
    const { user_id } = req.params

    User
        .findById(user_id)
        .select({ wallet: 1 })
        .populate('wallet')
        .then(({ wallet }) => {
            const { _id, amount, currencie } = wallet
            res.status(200).json({ _id, amount, currencie })
        })
        .catch(err => next(err))
})


router.get('/transactions/:wallet_id', (req, res, next) => {
    const { wallet_id } = req.params

    Wallet
        .findById(wallet_id)
        .select({ transactions: 1 })
        .populate('transactions')
        .then(({ transactions }) => res.status(200).json(transactions))
        .catch(err => next(err))
})


router.put('/create-transaction/:seller_id/:buyer_id/:product_id', (req, res, next) => {
    const { seller_id, buyer_id, product_id } = req.params

    const promises = [
        Transaction.create({ transactionType: 'PURCHASE', seller: seller_id, buyer: buyer_id, product: product_id }),
        Transaction.create({ transactionType: 'SALE', seller: seller_id, buyer: buyer_id, product: product_id }),
        User.findById(buyer_id).select({ wallet: 1 }),
        User.findById(seller_id).select({ wallet: 1 }),
        Product.findById(product_id).select({ price: 1 })
    ]

    Promise
        .all(promises)
        .then(results => {
            const promBuyerTransaction = results[0]
            const promSellerTransaction = results[1]
            const promBuyer = results[2]
            const promSeller = results[3]
            const promProduct = results[4]

            const buyerWalletUpdate = Wallet.findByIdAndUpdate(promBuyer.wallet, {
                $inc: { amount: -promProduct.price },
                $push: { transactions: promBuyerTransaction._id }
            })
            const sellerWalletUpdate = Wallet.findByIdAndUpdate(promSeller.wallet, {
                $inc: { amount: promProduct.price },
                $push: { transactions: promSellerTransaction._id }
            })

            Promise.all([buyerWalletUpdate, sellerWalletUpdate])
        })
        .then(() => res.status(200).json('Operacion realizada con exito'))
        .catch(err => next(err))

})

module.exports = router