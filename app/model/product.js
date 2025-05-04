// /models/product.js
const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: false },
    price: { type: String, required: true },
    thumbnail: { type: String, required: false },
    // categoryId: { type: mongoose.Schema.Types.ObjectId, ref: 'category', required: false, default: "" },
    stock: { type: Boolean, default: false },
    categoryId: { type: mongoose.Schema.Types.ObjectId, ref: 'category', required: false },

    create: { type: Date, default: Date.now },
    update: { type: Date, default: Date.now },
    delete: { type: Boolean, default: false },
});

const product = mongoose.model('product', productSchema);

module.exports = product;
