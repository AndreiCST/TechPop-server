const { Schema, model } = require("mongoose");

const conversationSchema = new Schema({
    messages: [
        {
            message: {
                type: String,
                required: true
            },
            sender: {
                type: {
                    type: Schema.Types.ObjectId,
                    ref: 'User',
                    required: true
                }
            },
            createdAt: {
                type: Date,
                default: Date.now
            }
        }
    ]
},
    {
        timestamps: true
    }
)

const Conversation = model("Conversation", conversationSchema)

module.exports = Conversation