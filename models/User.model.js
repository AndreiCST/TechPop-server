const { Schema, model } = require("mongoose");

const userSchema = new Schema({
    firstName: {
        type: String,
        trim: true,
        required: [true, 'El nombre de usuario es obligatorio']
    },
    lastName: {
        type: String,
        trim: true,
        required: [true, 'El nombre de usuario es obligatorio']
    },
    email: {
        type: String,
        unique: true,
        lowercase: true,
        required: [true, 'El email de usuario es obligatorio']
    },
    password: {
        type: String,
        required: [true, 'La contraseña de usuario es obligatoria']
    },
    // location: {
    //     type: {
    //         type: String,
    //         required: true
    //     },
    //     coordinates: [Number]
    // },
    valorations: {
        type: [{
            type: Schema.Types.ObjectId,
            ref: 'Valoration'
        }]
    },
    avatar: {
        type: String,
        set: string => string === '' ? 'https://www.pngitem.com/pimgs/m/30-307416_profile-icon-png-image-free-download-searchpng-employee.png' : string
    },
    rol: {
        type: String,
        enum: ['USER', 'ADMIN'],
        default: 'USER'
    },
    favouriteProducts: {
        type: [{
            type: Schema.Types.ObjectId,
            ref: 'Product'
        }]
    },
    favouriteSellers: {
        type: [{
            type: Schema.Types.ObjectId,
            ref: 'User'
        }]
    },
    sellingProducts: {
        type: [{
            type: Schema.Types.ObjectId,
            ref: 'Product'
        }]
    },
    soldProducts: {
        type: [{
            type: Schema.Types.ObjectId,
            ref: 'Product'
        }]
    },
    purchasedProducts: {
        type: [{
            type: Schema.Types.ObjectId,
            ref: 'Product'
        }]
    },
    wallet: {
        type: Schema.Types.ObjectId,
        ref: 'Wallet'
    },
    conversations: {
        type: [{
            type: Schema.Types.ObjectId,
            ref: 'Conversation'
        }]
    },
    activeUser: {
        type: Boolean,
        default: true
    }
},
    {
        timestamps: true
    }
)

const User = model("User", userSchema)

module.exports = User