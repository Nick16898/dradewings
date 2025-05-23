const connectToMongo = require('../connection/db');

/**
 * Function to generate a success response
 * @param {object} res - The response object
 * @param {string} message - The success message
 * @param {object} data - The data to be returned
 * @returns {object} - The JSON response
 */

let bassUrl = 'https://dradewings.onrender.com/tradewings/controller/uploads/';

const successResponse = (res, message = "success", data = [], baseUrl = false) => {
    let field = { status: 200, };
    if (baseUrl) field['url'] = bassUrl
    return res.status(200).json({ ...field, message: message, data: data });
}

/**
 * Function to generate an error response
 * @param {object} res - The response object
 * @param {string} message - The error message
 * @returns {object} - The JSON response
 */
const errorResponse = (res, message = "Something Went Wrong") => {
    return res.status(400).json({
        stsatus: 400,
        message: message
    });
}

/**
 * Function to save data to the database
 * @param {object} Model - The Mongoose model
 * @param {object} data - The data to be saved
 * @returns {object} - The saved data
 */
const saveModel = async (Model, data) => {
    try {
        const newData = new Model(data);
        const savedData = await newData.save();
        return savedData;
    } catch (error) {
        throw new Error(error.message);
    }
}

/**
 * Function to delete data from the database
 * @param {object} Model - The Mongoose model
 * @param {string} id - The ID of the document to be deleted
 * @returns {object} - The deleted data
 */
const deleteData = async (Model, id) => {
    try {
        const deletedData = await Model.findByIdAndDelete(id);
        if (!deletedData) {
            throw new Error("Data not found");
        }
        return deletedData;
    } catch (error) {
        throw new Error(error.message);
    }
}

/**
 * Function to select data from the database
 * @param {object} Model - The Mongoose model
 * @param {object} condition - The condition to filter the data
 * @param {string} fields - The fields to select
 * @returns {object} - The selected data
 */
const selectdata = async (Model, condition, fields) => {
    try {
        const data = await Model.find(condition).select(fields);
        return data;
    } catch (error) {
        throw new Error(error.message);
    }
}

const selectdatv2 = async (
    Model,
    condition,
    fields,
    limit = 10,
    offset = 0,
    searchFields = '',
    searchQuery = '',
    sortBy = {},
    joinModel = null
) => {
    try {
        // Convert space-separated searchFields into an array
        const fieldsArray = searchFields ? searchFields.split(' ').map(field => field.trim()) : [];

        // Add multiple search fields functionality
        if (fieldsArray.length > 0 && searchQuery) {
            const schemaPaths = Model.schema.paths; // Get schema paths for the model

            // Build the $or condition dynamically, ensuring only string fields use $regex
            condition.$or = fieldsArray
                .filter((field) => schemaPaths[field]?.instance === 'String') // Only include string fields
                .map((field) => ({
                    [field]: { $regex: searchQuery, $options: 'i' }, // Case-insensitive regex search
                }));
        }

        // Get total records count (ignores limit and offset)
        const totalRecords = await Model.countDocuments(condition);

        // Query the data with limit, offset, and sort
        let query = Model.find(condition).select(fields).limit(limit).skip(offset).sort(sortBy);

        // Apply join (populate) if provided
        if (joinModel) {
            query = query.populate(joinModel);
        }

        const data = await query.exec();

        return {
            totalRecords,
            data
        };
    } catch (error) {
        throw new Error(error.message);
    }
};



/**
 * Function to update data in the database
 * @param {object} Model - The Mongoose model
 * @param {object} conditions - The conditions to find the document to be updated
 * @param {object} update - The data to update
 * @returns {object} - The updated data
 */
const updateModel = async (Model, conditions, update) => {
    try {
        const updatedData = await Model.findOneAndUpdate(conditions, update, { new: true });
        if (!updatedData) {
            throw new Error("Data not found");
        }
        return updatedData;
    } catch (error) {
        throw new Error(error.message);
    }
}


/**
 * Middleware to validate request using Joi schema.
 * @param {Object} schema - Joi validation schema.
 * @param {string} property - Request property to validate ('body', 'query', 'params').
 */
const validate = (schema, property = 'body') => {
    return (req, res, next) => {
        const { error } = schema.validate(req[property], { abortEarly: false });
        if (error) {
            const errors = error.details.map(err => err.message);
            return res.status(400).json({ error: 'Validation Error', details: errors });
        }
        next();
    };
};

module.exports = {
    successResponse,
    errorResponse,
    saveModel,
    updateModel,
    deleteData,
    selectdata,
    selectdatv2,
    validate
};