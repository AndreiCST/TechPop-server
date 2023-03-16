const { Schema, model } = require("mongoose");

const conversationSchema = new Schema({

    messages: {
        type: [{
            type: Schema.Types.ObjectId,
            ref: 'Message'
        }]
    },
    participants: {
        type: [{
            type: Schema.Types.ObjectId,
            ref: 'User'
        }]
    },
    product: {
        type: Schema.Types.ObjectId,
        ref: 'Product'
    }
},
    {
        timestamps: true
    }
)

const Conversation = model("Conversation", conversationSchema)

module.exports = Conversation