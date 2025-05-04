// /models/category.js
const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
    category: { type: String, required: true },
    images: { type: String, required: true },
    create: { type: Date, default: Date.now },
    update: { type: Date, default: Date.now },
    delete: { type: Boolean, default: false },
});

const category = mongoose.model('category', categorySchema);

module.exports = category;
