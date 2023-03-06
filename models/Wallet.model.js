const { Schema, model } = require("mongoose");

const walletSchema = new Schema({
    amount: {
        type: Number,
        default: 0
    },
    currencie: {
        type: String,
        enum: ['EUR', 'USD', 'GBP', 'RON', 'CHF', 'YEN'],  //<---- esto si podemon utilizar una api de cambio de divisas
        default: 'EUR'
    },
    moneyIn: [{
        type: Number
    }],
    moneyOut: [{
        type: Number
    }],
    owner: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
},
    {
        timestamps: true
    }
)

const Wallet = model("Wallet", walletSchema)

module.exports = Wallet