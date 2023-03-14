const router = require('express').Router()
const bcrypt = require('bcryptjs')
const saltRounds = 10

const User = require('../../models/User.model')

// toda la info del usuario conectado
router.get('/all-info/:user_id', (req, res, next) => {

    const { user_id } = req.params

    User
        .findById(user_id)
        .select({
            firstName: 1,
            lastName: 1,
            avatar: 1,
            valorations: 1,
            favouriteProducts: 1,
            favouriteSellers: 1,
            sellingProducts: 1,
            soldProducts: 1,
            purchasedProducts: 1,
            wallet: 1,
            conversations: 1,
        })
        .populate('favouriteProducts')
        .populate('favouriteSellers')
        .populate('sellingProducts')
        .populate('soldProducts')
        .populate('purchasedProducts')
        .populate('wallet')
        .populate('conversations')
        .then(user => res.status(200).json(user))
        .catch(err => next(err))
})

//la info necesaria para la conversacion
router.get('/conv-info/:user_id', (req, res, next) => {

    const { user_id } = req.params

    User
        .findById(user_id)
        .select({
            firstName: 1,
            lastName: 1,
            avatar: 1,
        })
        .then(user => res.status(200).json(user))
        .catch(err => next(err))
})

//la info necesaria para ver el perfil de otro
router.get('/reduced-info/:user_id', (req, res, next) => {

    const { user_id } = req.params

    User
        .findById(user_id)
        .select({
            firstName: 1,
            lastName: 1,
            avatar: 1,
            valorations: 1,
            sellingProducts: 1,
        })
        .populate('valorations.allValorations')
        .then(user => res.status(200).json(user))
        .catch(err => next(err))
})

router.put('/edit/:user_id', (req, res, next) => {

    const { user_id } = req.params
    const { firstName, lastName, email, avatar } = req.body

    // const salt = bcrypt.genSaltSync(saltRounds)
    // const hashedPassword = bcrypt.hashSync(password, salt)

    User
        .findByIdAndUpdate(user_id, { firstName, lastName, email, avatar }, { new: true })
        .then(user => res.status(200).json(`El usuario ${user.firstName} ${user.lastName} se ha editado`))
        .catch(err => next(err))
})


router.delete('/delete/:user_id', (req, res, next) => {

    const { user_id } = req.params

    User
        .findByIdAndDelete(user_id, { new: true })
        .then(user => res.status(200).json(`El usuario ${user.firstName} ${user.lastName} se ha eliminado`))
        .catch(err => next(err))
})

module.exports = router