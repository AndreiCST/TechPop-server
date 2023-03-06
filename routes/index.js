const router = require("express").Router()

// const authRoutes = require('./auth.routes')
// router.use('/auth', authRoutes)

const productsRoutes = require('./products.routes')
router.use('/products', productsRoutes)

// const userRoutes = require('./user.routes')
// router.use('/user', userRoutes)


module.exports = router
