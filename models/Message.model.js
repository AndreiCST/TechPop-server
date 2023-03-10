const { Schema, model } = require("mongoose");

const messageSchema = new Schema({

    message: {
        type: String,
        required: [true, 'Necesita un mensaje']
    },
    sender: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }

},
    {
        timestamps: true
    }
)

const Message = model("Message", messageSchema)

module.exports = Message