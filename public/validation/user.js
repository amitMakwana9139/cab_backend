import Joi from "joi";
import mongoose from 'mongoose';

// Custom validation for ObjectId
const objectId = Joi.string().custom((value, helpers) => {
    if (!mongoose.Types.ObjectId.isValid(value)) {
        return helpers.message('Invalid ObjectId');
    }
    return value;
});

/* Create user API with validation */
export const createUserValidation = Joi.object({
    mobile: Joi.string()
        .pattern(/^[0-9]{10}$/) // only digits, exactly 10 characters
        .required()
        .messages({
            'string.pattern.base': 'Mobile number must contain exactly 10 digits',
            'string.empty': 'Mobile number is required',
            'any.required': 'Mobile number is required',
        }),
    name: Joi.string().required(),
    profileImage: Joi.string().optional(),
});

/* Create user API with validation */
export const editUserValidation = Joi.object({
    id: objectId.required(),
    mobile: Joi.string()
        .pattern(/^[0-9]{10}$/) // only digits, exactly 10 characters
        .optional()
        .messages({
            'string.pattern.base': 'Mobile number must contain exactly 10 digits',
            'string.empty': 'Mobile number is required',
            'any.required': 'Mobile number is required',
        }),
    name: Joi.string().optional(),
    profileImage: Joi.string().optional(),
});