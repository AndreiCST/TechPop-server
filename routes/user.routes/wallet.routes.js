const router = require('express').Router()
const Wallet = require('./../../models/Wallet.model')
const User = require('./../../models/User.model')

router.get('/:user_id', (req, res, next) => {
    const { user_id } = req.params

    User
        .findById(user_id)
        .select({ wallet: 1 })
        .then(wallet_id => res.send(wallet_id))
})

module.exports = router