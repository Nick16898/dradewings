const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const md5 = require('md5');
const enquiryModel = require('../../model/enquiry');
const { successResponse, errorResponse, saveModel, selectdata, selectdatv2 } = require('../../helper/index');

// addEnquiry 
const addEnquiry = async (req, res) => {
    const { name, email, phone, message } = req.body;
    try {
        let field = { name, email, phone, message };
        await saveModel(enquiryModel, field);
        return successResponse(res, 'Enquiry created successfully');

    } catch (err) {
        return errorResponse(res, err.message);
    }
}

// enquiryList
const enquiryList = async (req, res) => {
    let offset = parseInt(req.body.offset) || 0;
    let limit = parseInt(req.body.limit) || 10;
    let search = req.body.search || "";
    try {
        let fields = `_id name email phone message create`
        let data = await selectdatv2(enquiryModel, { delete: false }, fields, limit, offset, fields, search, { create: -1 });
        return successResponse(res, 'Enquiry list', data, true);
    } catch (err) {
        return errorResponse(res, err.message);
    }
}

module.exports = {
    addEnquiry,
    enquiryList,
}