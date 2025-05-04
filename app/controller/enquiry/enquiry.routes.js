const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const enquiryController = require('./enquiryController.js');
const enquiryValidation = require('./enquiryValidation.js');
const { validate } = require('../../helper/index.js');
const authenticate = require('../../middleware/auth.js');
// const authenticate = require('../../middleware/auth.js');

const router = express.Router();

// Apply global middleware
router.use(express.json()); // Parses JSON requests
router.use(authenticate); // Global authentication middleware

// Define the register route
router.post('/addenquiry',  enquiryController.addEnquiry);
router.post('/enquirylist', enquiryController.enquiryList);

module.exports = router;