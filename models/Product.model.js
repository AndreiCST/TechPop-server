const { Schema, model } = require('mongoose')

const productSchema = new Schema(
	{
		name: {
			type: String,
			trim: true,
			maxLength: 50,
			required: [true, 'El nombre del producto es obligatorio'],
		},
		description: {
			type: String,
			trim: true,
			maxLength: 5000,
			required: [true, 'La descripcion del producto es obligatoria'],
		},
		images: {
			type: [String],
			min: 1,
			max: 8,
			required: [true, 'Necesitas al menos una imagen'],
		},
		owner: {
			type: Schema.Types.ObjectId,
			ref: 'User',
		},
		price: {
			type: Number,
			min: 0,
			max: 999999,
			required: [true, 'El producto necesita un precio'],
		},
		stateOfProduct: {
			type: String,
			required: [true, 'El producto necesita el estado del producto'],
		},
		inSale: {
			type: Boolean,
			default: true,
		},
		category: {
			type: String,
			required: [true, 'El producto necesita una categoria'],
		},
		subcategory: {
			type: String,
			required: [true, 'El producto necesita una subcategoria'],
		},
		buyRequest: {
			type: [
				{
					type: Schema.Types.ObjectId,
					ref: 'User',
				},
			],
		},
		activeProduct: {
			type: Boolean,
			default: true,
		},
	},
	{
		timestamps: true,
	}
)

const Product = model('Product', productSchema)

module.exports = Product
