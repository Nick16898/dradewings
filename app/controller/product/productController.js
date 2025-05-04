const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const md5 = require('md5');
const productModel = require('../../model/product');
const productImageModel = require('../../model/productimages');
const { successResponse, errorResponse, saveModel, selectdata, updateModel, selectdatv2 } = require('../../helper/index');

// // POST route to create or edit an admin
// const addEditProduct = async (req, res) => {
//     let name = req.body.name || "";
//     let description = req.body.description || "";
//     let price = req.body.price || "";
//     let thumbnail = req.files ? `thumbnails/${req.file.filename}` : req.body.thumbnail || "";
//     let categoryId = req.body.categoryId || "";
//     let stock = req.body.stock || true;
//     let productId = req.body.productId || "";

//     console.log('====================================');
//     console.log('req.files:', thumbnail);
//     console.log('====================================');
//     // Get all extra images
//     // let images = req.files ? req.files.map(file => `images/${file.filename}`) : req.body.images || [];

//     try {
//         let field = { name, description, price, thumbnail, categoryId, stock};

//         if (productId) {
//             let product = await selectdata(productModel, { _id: productId, delete: false }, 'name description price thumbnail categoryId stock images');
//             if (!product[0]) {
//                 return errorResponse(res, 'Product not found');
//             }
//             field.update = new Date();
//             const updatedProduct = await updateModel(productModel, { _id: productId, delete: false }, field);
//             return successResponse(res, 'Product updated successfully', updatedProduct);
//         } else {
//             const savedProduct = await saveModel(productModel, field);
//             return successResponse(res, 'Product created successfully', savedProduct);
//         }
//     } catch (error) {
//         console.error('Error creating/updating product:', error);
//         return errorResponse(res, 'Error creating/updating product');
//     }
// }

const addEditProduct = async (req, res) => {
    try {
        let { name, description, price, categoryId, stock, productId } = req.body;

        // Convert stock to boolean
        stock = stock === "false" ? false : true;

        // Extract thumbnail properly
        let thumbnail = req.files && req.files.thumbnail ? `thumbnails/${req.files.thumbnail[0].filename}` : req.body.thumbnail || "";

        // Extract images array properly
        let images = req.files && req.files.images ? req.files.images.map(file => `images/${file.filename}`) : req.body.images || [];


        let field = { name, description, price, thumbnail, categoryId, stock, images };

        if (productId) {
            let product = await selectdata(productModel, { _id: productId, delete: false }, 'name description price thumbnail categoryId stock images');
            if (!product[0]) {
                return errorResponse(res, 'Product not found');
            }
            field.update = new Date();
            const updatedProduct = await updateModel(productModel, { _id: productId, delete: false }, field);
            return successResponse(res, 'Product updated successfully', updatedProduct);
        } else {
            const savedProduct = await saveModel(productModel, field);
            return successResponse(res, 'Product created successfully', savedProduct);
        }
    } catch (error) {
        console.error('Error creating/updating product:', error);
        return errorResponse(res, 'Error creating/updating product');
    }
};


// GET route to fetch the list of products
const getProductList = async (req, res) => {
    let productId = req.body.productId || "";
    let categoryId = req.body.categoryId || "";
    let limit = req.body.limit || 10;
    let offset = req.body.offset || 0;
    let search = req.body.search || "";
    try {
        let where = { delete: false };
        if (productId) {
            where._id = productId;
        }
        let field = 'name description price thumbnail categoryId stock'
        const products = await selectdatv2(productModel, where, field, limit, offset, field, search, {create: -1});
        return successResponse(res, 'Product list fetched successfully', products, true);
    } catch (error) {
        console.error('Error fetching product list:', error);
        return errorResponse(res, 'Error fetching product list');
    }
}

const deleteProduct = async (req, res) => {
    let productId = req.body.productId || "";
    try {
        await updateModel(productModel, { _id: productId, delete: false, update: new Date() }, { delete: true });
        return successResponse(res, 'Product deleted successfully', []);
    } catch (error) {
        console.error('Error deleting product:', error);
        return errorResponse(res, 'Error deleting product');
    }
}

// add edit product image
const addEditProductImage = async (req, res) => {
    let productId = req.body.productId || "";
    let imageId = req.body.imageId || "";
    let image = req.file ? `images/${req.file.filename}` : req.body.image || "";
    try {
        let product = await selectdata(productModel, { _id: productId, delete: false }, 'images');
        if (product.legth == 1) {
            return errorResponse(res, 'Product not found');
        }
        if (imageId) {
            let imageDetail = await selectdata(productImageModel, { _id: imageId, delete: false }, 'images');
            if (!imageDetail[0]) {
                return errorResponse(res, 'Product image not found');
            }
            const updatedImage = await updateModel(productImageModel, { _id: imageId, delete: false }, { images: image });
            return successResponse(res, 'Product image updated successfully', updatedImage);
        }
        else{
            const savedImage = await saveModel(productImageModel, { images: image });
            return successResponse(res, 'Product image add successfully', savedImage);
        }
    }catch(error){
        console.error('Error fetching product:', error);
        return errorResponse(res, 'Error fetching product');
    }
}

module.exports = {
    addEditProduct,
    getProductList,
    deleteProduct,
    addEditProductImage,
}