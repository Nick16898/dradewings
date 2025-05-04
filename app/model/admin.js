// /models/admin.js
const mongoose = require('mongoose');

const adminSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String, required: false },
    address: { type: String, required: false },
    profile: { type: String, required: false },
    password: { type: String, required: true },
    create: { type: Date, default: Date.now },
    delete: { type: Boolean, default: false },
});

const admin = mongoose.model('admin', adminSchema);

module.exports = admin;
