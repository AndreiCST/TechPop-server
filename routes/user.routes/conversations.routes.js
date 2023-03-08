const router = require('express').Router()
const User = require('./../../models/User.model')
const Conversation = require('./../../models/Conversation.model')
const Message = require('./../../models/Message.model')
const { response } = require('express')


<<<<<<< HEAD

=======
>>>>>>> miguel
router.put('/create/:buyer_id/:seller_id', (req, res, next) => {

    const { buyer_id, seller_id } = req.params

    Conversation
        .create({ messages: [], buyer: buyer_id, seller: seller_id })
        .then(conversation => {

            const editBuyer = User.findByIdAndUpdate(buyer_id, { $addToSet: { conversations: conversation._id } }, { new: true })
            const editSeller = User.findByIdAndUpdate(seller_id, { $addToSet: { conversations: conversation._id } }, { new: true })
            const promises = [editBuyer, editSeller]

            return Promise.all(promises)
        })
<<<<<<< HEAD
        .then(values => {
            res.status(200).json(values)
        })
=======
        .then(values => res.status(200).json(values))
>>>>>>> miguel
        .catch(err => next(err))
})


router.get('/:user_id', (req, res, next) => {

    const { user_id } = req.params

    User
        .findById(user_id)
        .select({ conversations: 1 })
        .then(conversations => res.status(200).json(conversations))
        .catch(err => next(err))
})


router.put('/add-message/:conversation_id/:user_id', (req, res, next) => {

    const { conversation_id, user_id } = req.params
    const { message } = req.body

    Message
        .create({ message, sender: user_id })
        .then(message => {
            Conversation
                .findByIdAndUpdate(conversation_id, { $addToSet: { messages: message._id } }, { new: true })
<<<<<<< HEAD
                .then(user => { res.status(200).json(user) })
=======
                .then(response => res.status(200).json(response))
>>>>>>> miguel
                .catch(err => next(err))
        })
        .catch(err => next(err))
})


router.get('/conversation/:conversation_id', (req, res, next) => {

    const { conversation_id } = req.params

    Conversation
        .findById(conversation_id)
        .populate('messages')
        .select({ message: 1 })
<<<<<<< HEAD
        .then(response => {
            res.json(response)
        })
=======
        .then(conversation => res.json(conversation))
>>>>>>> miguel
        .catch(err => next(err))
})


router.delete('/delete/:user_id/:conversation_id', (req, res, next) => {

    const { user_id, conversation_id } = req.params

    User
        .findByIdAndUpdate(user_id, { $pull: { conversations: conversation_id } }, { new: true })
        .then((user) => res.status(200).json(user))
        .catch(err => next(err))
})


module.exports = router