const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const productController = require('./productController');
const productValidation = require('./productValidation');


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const uploadPath = path.join(__dirname, '../uploads/thumbnails');
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

const upload = multer({ storage: storage });

const router = express.Router();

// add product
router.post('/addeditproduct', upload.fields([{ name: 'thumbnail', maxCount: 1 }, { name: 'images', maxCount: 10 }]), productController.addEditProduct);
router.post('/getproductlist', productController.getProductList);
router.post('/deleteproduct', productController.deleteProduct);
router.post('/addeditproductimage', upload.fields([{ name: 'images', maxCount: 1 }]), productController.addEditProductImage);


module.exports = router;