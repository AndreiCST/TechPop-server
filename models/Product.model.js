const { Schema, model } = require("mongoose");

const productSchema = new Schema({
    name: {
        type: String,
        trim: true,
        maxLength: 30,
        required: [true, 'El nombre del producto es obligatorio']
    },
    description: {
        type: String,
        trim: true,
        maxLength: 500,
        required: [true, 'La descripcion del producto es obligatoria']
    },
    images: {
        type: [String],
        min: 1,
        max: 5,
        required: [true, 'Necesitas al menos una imagen']
    },
    owner: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    price: {
        type: Number,
        min: 0,
        required: [true, 'El producto necesita un precio'],
    },
    stateOfProduct: {
        type: String,
        enum: ['Nuevo', 'Casi nuevo', 'Usado', 'Muy usado'],
        required: [true, 'El producto necesita el estado del producto']
    },
    inSale: {
        type: Boolean,
        default: true
    },
    category: {
        type: String,
        enum: ['Componentes', 'Ordenadores', 'Telefonia', 'Gaming', 'Tablets', 'Audio y foto'],
        required: [true, 'El producto necesita una categoria']
        // type: Schema.Types.ObjectId,
        // ref: 'Category',
        // required: [true, 'Necesita una categoria']
    },
    subcategory: {
        type: String,
        enum: ['Producto', 'Accesorio', 'Videojuego', 'Otros'],
        required: [true, 'El producto necesita una subcategoria']
        // type: Schema.Types.ObjectId,
        // ref: 'Subcategory',
    },
    buyRequest: {
        type: [{
            type: Schema.Types.ObjectId,
            ref: 'User'
        }]
    },
    activeProduct: {
        type: Boolean,
        default: true
    }
},
    {
        timestamps: true
    }
)

const Product = model("Product", productSchema)

module.exports = Product