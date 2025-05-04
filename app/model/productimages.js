// /models/productimages.js
const mongoose = require('mongoose');

const productimagesSchema = new mongoose.Schema({
    productId: { type: mongoose.Schema.Types.ObjectId, ref: 'productimages', required: false },
    images: { type: String, required: true },
    create: { type: Date, default: Date.now },
    update: { type: Date, default: Date.now },
    delete: { type: Boolean, default: false },
});

const productimages = mongoose.model('productimages', productimagesSchema);

module.exports = productimages;
