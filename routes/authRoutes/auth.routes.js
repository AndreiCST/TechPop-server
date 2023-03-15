const router = require("express").Router()

const User = require('../../models/User.model')
const Wallet = require('../../models/Wallet.model')

const { verifyToken } = require("../../middlewares/verifyToken")


router.get('/updateToken', verifyToken, (req, res, next) => {

    const user_id = req.payload._id

    User
        .findById(user_id)
        .then(user => {
            const token = user.signToken()
            res.json(token)
        })
        .catch(err => next(err))
})

router.post('/signup', (req, res, next) => {

    const { email, password, firstName, lastName, avatar } = req.body

    return Wallet
        .create({})
        .then(wallet => User.create({ email, password, firstName, lastName, wallet: wallet._id, avatar }))
        .then(user => res.status(201).json(user))
        .catch(err => next(err))
})


router.post('/login', (req, res, next) => {

    const { email, password } = req.body

    if (email === '' || password === '') {
        res.status(400).json({ errorMessages: "Provide email and password." })
        return
    }

    User
        .findOne({ email })
        .then((foundUser) => {

            if (!foundUser) {
                res.status(401).json({ errorMessages: "User not found." })
                return
            }

            if (foundUser.validatePassword(password)) {
                const authToken = foundUser.signToken()
                res.status(200).json({ authToken })
            }
            else {
                res.status(401).json({ errorMessages: "Incorrect password" })
            }
        })
        .catch(err => next(err))
})


router.get('/verify', verifyToken, (req, res, next) => {
    res.json(req.payload)
})



module.exports = router