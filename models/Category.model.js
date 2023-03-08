const { Schema, model } = require("mongoose");

const categorySchema = new Schema({
    title: {
        type: String,
        required: [true, 'El titulo es obligatorio']
    },
    subcategory: {
        type: [{
            type: Schema.Types.ObjectId,
            ref: 'Subcategory'
        }]
    },
    cover: {
        type: String,
        required: [true, 'Imagen necesaria']
    }

},
    {
        timestamps: true
    }
)

const Category = model("Category", categorySchema)

module.exports = Category