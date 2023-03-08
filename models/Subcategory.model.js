const { Schema, model } = require("mongoose");

const subcategorySchema = new Schema({
    title: {
        type: String,
        required: [true, 'Necesita un titulo']
    },
    cover: {
        type: String,
        required: [true, 'Necesita una imagen']
    }

},
    {
        timestamps: true
    }
)

const Subcategory = model("Subcategory", subcategorySchema)

module.exports = Subcategory