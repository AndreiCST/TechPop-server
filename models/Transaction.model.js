const { Schema, model } = require("mongoose");

const transactionSchema = new Schema({
    transactionType: {
        type: String,
        enum: ['PURCHASE', 'SALE']
    },
    buyer: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    seller: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    product: {
        type: Schema.Types.ObjectId,
        ref: 'Product'
    },
    activeTransaction: {
        type: Boolean,
        default: true
    }
},
    {
        timestamps: true
    }
)

const Transaction = model("Transaction", transactionSchema)

module.exports = Transaction