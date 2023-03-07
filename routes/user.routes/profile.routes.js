const router = require('express').Router()
const bcrypt = require('bcryptjs')
const saltRounds = 10

const User = require('./../../models/User.model')


router.get('/:user_id', (req, res, next) => {

    const { user_id } = req.params

    User
        .findById(user_id)
        .then((user) => res.status(200).json(user))
        .catch(err => next(err))
})


router.put('/edit/:user_id', (req, res, next) => {

    const { user_id } = req.params
    const { firstName, lastName, email, password, avatar } = req.body

    const salt = bcrypt.genSaltSync(saltRounds)
    const hashedPassword = bcrypt.hashSync(password, salt)

    User
        .findByIdAndUpdate(user_id, { firstName, lastName, email, password: hashedPassword, avatar }, { new: true })
        .then((user) => res.status(200).json(user))
        .catch(err => next(err))
})


router.delete('/delete/:user_id', (req, res, next) => {

    const { user_id } = req.params

    User
        .findByIdAndDelete(user_id, { new: true })
        .then((users) => res.status(200).json({ users }))
        .catch(err => next(err))
})

module.exports = router