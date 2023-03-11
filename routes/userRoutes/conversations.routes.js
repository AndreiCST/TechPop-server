const router = require('express').Router()
const User = require('../../models/User.model')
const Conversation = require('../../models/Conversation.model')
const Message = require('../../models/Message.model')


router.put('/create/:buyer_id/:seller_id', (req, res, next) => {

    const { buyer_id, seller_id } = req.params


    Conversation
        .create({ participants: [buyer_id, seller_id] })
        .then(({ _id }) => {

            const editBuyer = User.findByIdAndUpdate(buyer_id, { $addToSet: { conversations: _id } }, { new: true })
            const editSeller = User.findByIdAndUpdate(seller_id, { $addToSet: { conversations: _id } }, { new: true })

            const promises = [editBuyer, editSeller]

            return Promise.all(promises)
        })
        .then(() => res.status(200).json('Conversacion creada'))
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
                .then(response => res.status(200).json(response))
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
        .then(conversation => res.status(200).json(conversation))
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