const { Schema, model } = require("mongoose");

const subcategorySchema = new Schema({
    title: {
        type: String,
        required: true
    },
    cover: {
        type: String,
        required: true
    }

},
    {
        timestamps: true
    }
)

const Subcategory = model("Subcategory", subcategorySchema)

module.exports = Subcategory