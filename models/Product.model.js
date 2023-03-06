const { Schema, model } = require("mongoose");

const productSchema = new Schema({
    name: {
        type: String,
        trim: true,
        max: 50,
        required: [true, 'El nombre del producto es obligatorio']
    },
    description: {
        type: String,
        trim: true,
        max: 500,
        required: [true, 'La descripcion del producto es obligatoria']
    },
    images: {
        type: [String],
        min: 1,
        max: 5,
    },
    owner: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    price: {
        type: Number,
        required: true,
    },
    stateOfProduct: {
        type: String,
        enum: ['NEW', 'USED']
    },
    inSale: {
        type: Boolean,
        default: true
    },
    category: {
        type: Schema.Types.ObjectId,
        ref: 'Category'
    },
    subcategory: {
        type: Schema.Types.ObjectId,
        ref: 'Subcategory'
    },
    buyRequest: [{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }]
},
    {
        timestamps: true
    }
)

const Product = model("Product", productSchema)

module.exports = Product