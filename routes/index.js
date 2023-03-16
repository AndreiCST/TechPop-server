const router = require("express").Router()

const authRoutes = require('./authRoutes/auth.routes')
router.use('/auth', authRoutes)

const productsRoutes = require('./productsRoutes/products.routes')
router.use('/products', productsRoutes)

const userRoutes = require('./userRoutes')
router.use('/user', userRoutes)

const uploadsRoutes = require('./uploadsRoutes/upload.routes')
router.use('/upload', uploadsRoutes)

const transactionsRoutes = require('./transactionsRoutes/transactions.routes')
router.use('/transactions', transactionsRoutes)

module.exports = router
