const { Schema, model } = require("mongoose");

const messageSchema = new Schema({

    message: {
        type: String,
<<<<<<< HEAD
        required: true
=======
        required: [true, 'Necesita un mensaje']
>>>>>>> miguel
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