const { Schema, model } = require("mongoose");

const transactionSchema = new Schema({
    buyer: {
        type: {
            type: Schema.Types.ObjectId,
            ref: 'User'
        }
    },
    sellesr: {
        type: {
            type: Schema.Types.ObjectId,
            ref: 'User'
        }
    },
    product: {
        type: {
            type: Schema.Types.ObjectId,
            ref: 'Product'
        }
    }
},
    {
        timestamps: true
    }
)

const Transaction = model("Transaction", transactionSchema)

module.exports = Transaction