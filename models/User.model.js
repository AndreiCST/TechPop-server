const { Schema, model } = require("mongoose")
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')


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
        required: [true, 'La contraseña de usuario es obligatoria'],
        minlength: [2, 'La contraseña tiene que tener un minimo de 2 caracteres']
    },
    // location: {
    //     type: {
    //         type: String,
    //         required: true
    //     },
    //     coordinates: [Number]
    // },
    valorations: {
        avgValoration: {
            type: Number,
            default: 0
        },
        allValorations: [{
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

userSchema.pre('save', function (next) {

    const saltRounds = 10
    const salt = bcrypt.genSaltSync(saltRounds)
    const hashedPassword = bcrypt.hashSync(this.password, salt)
    this.password = hashedPassword

    next()
})

userSchema.methods.signToken = function () {
    const { _id, username, email } = this
    const payload = { _id, username, email }

    const authToken = jwt.sign(
        payload,
        process.env.TOKEN_SECRET,
        { algorithm: 'HS256', expiresIn: "6h" }
    )

    return authToken
}

userSchema.methods.validatePassword = function (candidatePassword) {
    return bcrypt.compareSync(candidatePassword, this.password)
}

const User = model("User", userSchema)

module.exports = User