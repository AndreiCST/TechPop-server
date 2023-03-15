const router = require("express").Router()

const bcrypt = require('bcryptjs')
const User = require('../../models/User.model')
const Wallet = require('../../models/Wallet.model')
const saltRounds = 10

const jwt = require('jsonwebtoken')
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

    if (password.length < 2) {
        res.status(400).json({ errorMessages: 'Password must have at least 3 characters' })
        return
    }

    const promises = [
        User.findOne({ email }),
        Wallet.create({})
    ]

    Promise
        .all(promises)
        .then(results => {
            console.log(results)
            const promUser = results[0]
            const promWallet = results[1]

            if (promUser) {
                res.status(400).json({ errorMessages: "User already exists." })
                return
            }

            const salt = bcrypt.genSaltSync(saltRounds)
            const hashedPassword = bcrypt.hashSync(password, salt)

            return User.create({ email, password: hashedPassword, firstName, lastName, wallet: promWallet._id, avatar })
        })
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

            if (bcrypt.compareSync(password, foundUser.password)) {

                const { _id, email, firstName, lastName, avatar, rol } = foundUser
                const payload = { _id, email, firstName, lastName, avatar, rol }

                const authToken = jwt.sign(
                    payload,
                    process.env.TOKEN_SECRET,
                    { algorithm: 'HS256', expiresIn: "6h" }
                )

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