const { default: mongoose } = require("mongoose");
const Schema = mongoose.Schema;

const product = new Schema(
    {
        name: {
            type: String,
            required: true,
        },
        category: {
            type: String,
            required: true,
        },
        price: {
            type: Number,
            required: true,
        },
        stock: {
            type: Number,
            required: true,
        },
        productImg: {
            type: String,
        },
        status: {
            type: String,
            enum: ["in stock", "out of stock"],
            default: "in stock",
            required: true,
        },
    },
    { timestamps: true }
)

module.exports = mongoose.model('products', product, 'products')