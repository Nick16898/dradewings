const Joi = require('joi');

const addEditProduct = Joi.object({
    name: Joi.string().required().messages({
        "string.base": "Product name must be a string.",
        "string.empty": "Product name is required.",
        "any.required": "Product name is required."
    }),
    description: Joi.string().required().messages({
        "string.base": "Description must be a string.",
        "string.empty": "Description is required.",
        "any.required": "Description is required."
    }),
    price: Joi.string().required().messages({
        "string.base": "Price must be a string.",
        "string.empty": "Price is required.",
        "any.required": "Price is required."
    }),
    thumbnail: Joi.string().required().messages({
        "string.base": "Thumbnail must be a string.",
        "string.empty": "Thumbnail is required.",
        "any.required": "Thumbnail is required."
    }),
    categoryId: Joi.string().required().messages({
        "string.base": "Category ID must be a string.",
        "string.empty": "Category ID is required.",
        "any.required": "Category ID is required."
    }),
    stock: Joi.boolean().required().messages({
        "boolean.base": "Stock must be a boolean value.",
        "any.required": "Stock is required."
    }),
    productId: Joi.string().optional().messages({
        "string.base": "Product ID must be a string."
    })
});


module.exports = {
    addEditProduct
};