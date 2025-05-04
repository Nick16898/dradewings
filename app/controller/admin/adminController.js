const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const md5 = require('md5');
const adminModel = require('../../model/admin');
const { successResponse, errorResponse, saveModel, selectdata, selectdatv2, updateModel } = require('../../helper/index');

// POST route to create or edit an admin
const addEditAdmin = async (req, res) => {
    let name = req.body.name || "";
    let phone = req.body.phone || "";
    let address = req.body.address || "";
    let email = req.body.email || "";
    let password = req.body.password || "";
    let adminId = req.body.adminId || "";
    let profile = req.file ? `profiles/${req.file.filename}` : req.body.profile || "";
    console.log(req.file,"===============");
    
    try {
        let field = {
            name,
            phone,
            address,
            email
        };
        if (profile) {
            field.profile = profile;
        }

        if (adminId) {
            // Edit existing admin
            let admin = await adminModel.findById(adminId);
            if (!admin) {
                return errorResponse(res, 'Admin not found');
            }

            // Check if email or phone already exists for another admin
            let existingAdmin = await adminModel.findOne({
                $or: [{ email }, { phone }],
                _id: { $ne: adminId }
            });
            if (existingAdmin) {
                return errorResponse(res, 'Admin with this email or phone already exists');
            }

            field.update = new Date();
            const updatedAdmin = await updateModel(adminModel, { _id: adminId }, field);
            return successResponse(res, 'Admin updated successfully', updatedAdmin);
        } else {
            // check email or phone admin already exist or not
            let existingAdmin = await adminModel.findOne({ $or: [{ email }, { phone }] });
            if (existingAdmin) {
                return errorResponse(res, 'Admin with this email or phone already exists');
            }

            // Hash the password using MD5
            field.password = md5(password);
            const savedAdmin = await saveModel(adminModel, field);
            return successResponse(res, 'Admin created successfully', savedAdmin);
        }
    } catch (error) {
        console.log('Error creating/updating admin:', error);
        return errorResponse(res, 'Error creating/updating admin');
    }
}

// login 
const login = async (req, res) => {
    let email = req.body.email || "";
    let password = req.body.password || "";

    try {
        // Hash the password using MD5
        const hashedPassword = md5(password);
        
        const admin = await adminModel.findOne({ email, password: hashedPassword });
        if (!admin) {
            return errorResponse(res, 'Invalid email or password');
        }

        return successResponse(res, 'Login successful', admin);
    } catch (error) {
        console.error('Error logging in:', error);
        return errorResponse(res, 'Error logging in');
    }
}

// admin profile
const adminProfile = async (req, res) => {
    const adminId = req.body.adminId || "";
    const limit = req.body.limit || 0;
    const offset = req.body.offset || 0;
    const searchQuery = req.body.searchQuery || 0;
    try {
        let field = `name email phone address profile`
        let data = await selectdatv2(adminModel, { _id: adminId, delete: false }, field,limit, offset, field, searchQuery,{ createdAt: -1 });
        if (data.length == 0) {
            return errorResponse(res, 'Admin not found');
        }
        return successResponse(res, 'Admin profile fetched successfully', data, true);
    }
    catch (error) {
        console.error('Error logging in:', error);
        return errorResponse(res, 'Error logging in');
    }
}

module.exports = {
    addEditAdmin,
    login,
    adminProfile,
}