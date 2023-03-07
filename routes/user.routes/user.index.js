const router = require('express').Router()

const valorationsRoutes = require('./valorations.routes')
router.use('/valorations', valorationsRoutes)

// const favouritesRoutes = require('./favourites.routes')
// router.use('/favourites', favouritesRoutes)

// const conversationsRoutes = require('./conversations.routes')
// router.use('/conversations', conversationsRoutes)

// const profileRoutes = require('./profile.routes')
// router.use('/profile', profileRoutes)

const walletRoutes = require('./wallet.routes')
router.use('/wallet', walletRoutes)

const tradedRoutes = require('./traded.routes')
router.use('/traded', tradedRoutes)

module.exports = router