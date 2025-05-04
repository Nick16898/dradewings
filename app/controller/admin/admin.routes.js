const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const adminController = require('./adminController.js');
const adminValidation = require('./adminValidation.js');
const { validate } = require('../../helper/index.js');
const authenticate = require('../../middleware/auth.js');
// const authenticate = require('../../middleware/auth.js');

const app = express();
const router = express.Router();


const adminProfile = multer.diskStorage({
    destination: (req, file, cb) => {
        const uploadPath = path.join(__dirname, '../uploads/admin/profiles');
        if (!fs.existsSync(uploadPath)) {
            fs.mkdirSync(uploadPath, { recursive: true });
        }
        cb(null, uploadPath);
    },
    filename: (req, file, cb) => {
        const ext = path.extname(file.originalname);
        cb(null, `${Date.now()}${ext}`);
    }
});

const uploadProfile = multer({ storage: adminProfile });

// Apply global middleware
router.use(express.json()); // Parses JSON requests
router.use(authenticate); // Global authentication middleware

// Define the register route
router.post('/addadmin', uploadProfile.single('profile'), validate(adminValidation.addEditAdmin), adminController.addEditAdmin);
router.post('/login', validate(adminValidation.login), adminController.login);
router.post('/adminprofile', adminController.adminProfile);

module.exports = router;