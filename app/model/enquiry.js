// /models/enquiry.js
const mongoose = require('mongoose');

const enquirySchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, default: "", required: false },
    phone: { type: String, required: true },
    message: { type: String, default: "", required: true },
    create: { type: Date, default: Date.now },
    update: { type: Date, default: Date.now },
    delete: { type: Boolean, default: false },
});

const enquiry = mongoose.model('enquiry', enquirySchema);

module.exports = enquiry;
