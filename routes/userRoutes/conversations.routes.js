const router = require('express').Router()
const User = require('../../models/User.model')
const Conversation = require('../../models/Conversation.model')
const Message = require('../../models/Message.model')


router.get('/verify-if-exist/:user_id/:seller_id/:product_id', (req, res, next) => {

    const { user_id, seller_id, product_id } = req.params

    Conversation
        .find({ participants: { $all: [user_id, seller_id] }, product: product_id })
        .then(result => {
            if (result.length > 0) {
                User.findByIdAndUpdate(user_id, { $addToSet: { conversations: result[0]._id } }, { new: true })
                    .then(() => res.status(200).json(result[0]._id))
                    .catch(err => next(err))
            } else {
                res.json('false')
            }
        })
        .catch(err => next(err))
})

router.get('/conversation-messages/:conversation_id', (req, res, next) => {

    const { conversation_id } = req.params

    Conversation
        .findById(conversation_id)
        .populate('messages')
        .then(result => res.status(200).json(result))
        .catch(err => next(err))
})


router.put('/create/:buyer_id/:seller_id/:product_id', (req, res, next) => {

    const { buyer_id, seller_id, product_id } = req.params


    Conversation
        .create({ participants: [buyer_id, seller_id], product: product_id })
        .then(({ _id }) => {

            const editBuyer = User.findByIdAndUpdate(buyer_id, { $addToSet: { conversations: _id } }, { new: true })
            const editSeller = User.findByIdAndUpdate(seller_id, { $addToSet: { conversations: _id } }, { new: true })

            const promises = [editBuyer, editSeller]

            return Promise.all(promises)
        })
        .then(() => res.status(200).json('Conversacion creada'))
        .catch(err => next(err))
})


router.put('/add-message/:conversation_id/:user_id', (req, res, next) => {

    const { conversation_id, user_id } = req.params
    const { message } = req.body

    Message
        .create({ message, sender: user_id })
        .then(message => {
            return Conversation.findByIdAndUpdate(conversation_id, { $addToSet: { messages: message._id } }, { new: true })
        })
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