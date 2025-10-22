// validations/taskValidation.js
import Joi from 'joi';

/* Create super admin validation */
export const createSuperAdminValidation = Joi.object({
    email: Joi.string().email().required(),
    mobile: Joi.string()
        .pattern(/^[0-9]{10}$/) // only digits, exactly 10 characters
        .required()
        .messages({
            'string.pattern.base': 'Mobile number must contain exactly 10 digits',
            'string.empty': 'Mobile number is required',
            'any.required': 'Mobile number is required',
        }),
    password: Joi.string().required().min(2),
    theme: Joi.string().required()
});

/* Singin validation for common user  */
export const signinSuperAdminValidation = Joi.object({
    email: Joi.string().email().optional(),
    mobile: Joi.string()
        .pattern(/^[0-9]{10}$/) // only digits, exactly 10 characters
        .required()
        .messages({
            'string.pattern.base': 'Mobile number must contain exactly 10 digits',
            'string.empty': 'Mobile number is required',
            'any.required': 'Mobile number is required',
        }),
    password: Joi.string().required().min(2)
});

/* Create admin API with validation */
export const createAdminValidation = Joi.object({
    mobile: Joi.string()
        .pattern(/^[0-9]{10}$/) // only digits, exactly 10 characters
        .required()
        .messages({
            'string.pattern.base': 'Mobile number must contain exactly 10 digits',
            'string.empty': 'Mobile number is required',
            'any.required': 'Mobile number is required',
        }),
    password: Joi.string().required().min(2),
    permissions: Joi.object({
        booking: Joi.object({
            create: Joi.boolean().default(false),
            edit: Joi.boolean().default(false),
            delete: Joi.boolean().default(false),
        }).default({}),

        user: Joi.object({
            view: Joi.boolean().default(false),
            delete: Joi.boolean().default(false),
        }).default({}),
    })
        .default({}) // ensure it's an object even if missing
        .messages({
            'object.base': 'Permissions must be a valid object',
        }).required(),
    theme: Joi.string().required(),
    role: Joi.number().integer().required().valid(0, 2, 3)
});