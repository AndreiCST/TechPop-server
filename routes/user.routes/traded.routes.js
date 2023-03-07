const router = require('express').Router()
const User = require('./../../models/User.model')
const Product = require('./../../models/Product.model')
const Category = require('./../../models/Category.model')
const Subcategory = require('./../../models/Subcategory.model')

router.get('/selling/:user_id', (req, res, next) => {
    const { user_id } req.params

    User
        .findById(user_id)
        .then(products => res.send(products))
        .catch(err => next(err))
})


module.exports = router