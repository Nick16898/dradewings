const Joi = require('joi');

const addEditAdmin = Joi.object({
    name: Joi.string().required().messages({
        'string.empty': 'Name is required'
    }),
    email: Joi.string().email().required().messages({
        'string.email': 'Valid email is required',
        'string.empty': 'Email is required'
    }),
    password: Joi.string().min(6).required().messages({
        'string.min': 'Password must be at least 6 characters long',
        'string.empty': 'Password is required'
    }),
    phone: Joi.string().optional(),
    address: Joi.string().optional(),
    password: Joi.string().optional(),
    profile: Joi.string().optional(),
    adminId: Joi.string().optional()
});

const login = Joi.object({
    email: Joi.string().email().required().messages({
        'string.email': 'Valid email is required',
        'string.empty': 'Email is required'
    }),
    // password: Joi.string().pattern(new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})')).required().messages({
    //     'string.pattern.base': 'Password must contain at least one uppercase letter, one lowercase letter, one number and one special character',
    //     'string.empty': 'Password is required'
    // })
    password: Joi.string().required()
});

module.exports = {
    addEditAdmin,
    login
};