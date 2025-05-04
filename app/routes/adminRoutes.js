const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const adminController = require('../controller/admin/adminController'); 
const adminValidation = require('../controller/admin/adminValidation'); 



const router = express.Router();

// Define the register route
router.post('/addadmin', adminController.addEditAdmin);
router.post('/login', adminController.login);

module.exports = router;