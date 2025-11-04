import Joi from "joi";
import mongoose from 'mongoose';

// Custom validation for ObjectId
const objectId = Joi.string().custom((value, helpers) => {
    if (!mongoose.Types.ObjectId.isValid(value)) {
        return helpers.message('Invalid ObjectId');
    }
    return value;
});

// Note :- companyId optional in required 
export const paginationValidation = Joi.object({
    page: Joi.number().required().min(1),
    limit: Joi.number().required().min(1),
    search: Joi.string().allow("")
});

// Common validation of id
export const commonIdValidation = Joi.object({
    id: objectId.required()
});