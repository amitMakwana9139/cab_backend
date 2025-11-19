import Joi from 'joi';
import mongoose from 'mongoose';

// Custom validation for ObjectId
const objectId = Joi.string().custom((value, helpers) => {
    if (!mongoose.Types.ObjectId.isValid(value)) {
        return helpers.message('Invalid ObjectId');
    }
    return value;
});

/* Create booking validation */
export const createBookingValidation = Joi.object({
    customerId: objectId.required(),
    customerName: Joi.string().required(),
    country: Joi.string().required(),
    mobile: Joi.string()
        .pattern(/^[0-9]{10}$/) // only digits, exactly 10 characters
        .required()
        .messages({
            'string.pattern.base': 'Mobile number must contain exactly 10 digits',
            'string.empty': 'Mobile number is required',
            'any.required': 'Mobile number is required',
        }),
    tripStartDate: Joi.string()
        .pattern(/^\d{2}-\d{2}-\d{4}$/) // yyyy-mm-dd format
        .allow(null, "") // allow empty or null
        .required(),
    tripEndDate: Joi.string()
        .pattern(/^\d{2}-\d{2}-\d{4}$/) // yyyy-mm-dd format
        .allow(null, "") // allow empty or null
        .optional(),
    time: Joi.string().required(),
    tripType: Joi.string().required(),
    carType: Joi.string().required(),
    pickupLocation: Joi.string().required(),
    multipleStop: Joi.array().items(Joi.string()).optional(),
    dropLocation: Joi.string().required(),
    totalPassenger: Joi.number().integer().required(),
    totalLuggage: Joi.number().integer().required(),
    vendorName: Joi.string().optional(),
    vendorPrice: Joi.number().optional(),
    bookingPrice: Joi.number().required(),
    advancePaid: Joi.number().integer().optional(),
    commission: Joi.number().integer().optional(),
    vehicleId: objectId.optional(),
    vehicleNumber: Joi.string().optional(),
    vehicleName: Joi.string().optional(),
    vehicleType: Joi.string().optional(),
    driverId: objectId.optional(),
    driverNumber: Joi.string().optional(),
    driverName: Joi.string().optional(),
    remarks: Joi.string().optional().allow(""),
});

/* Edit booking validation */
export const editBookingValidation = Joi.object({
    id: objectId.required(),
    customerId: objectId.optional(),
    customerName: Joi.string().optional(),
    country: Joi.string().optional(),
    mobile: Joi.string()
        .pattern(/^[0-9]{10}$/) // only digits, exactly 10 characters
        .optional()
        .messages({
            'string.pattern.base': 'Mobile number must contain exactly 10 digits',
            'string.empty': 'Mobile number is required',
            'any.required': 'Mobile number is required',
        }),
    tripStartDate: Joi.string()
        .pattern(/^\d{2}-\d{2}-\d{4}$/) // yyyy-mm-dd format
        .allow(null, "") // allow empty or null
        .optional(),
    tripEndDate: Joi.string()
        .pattern(/^\d{2}-\d{2}-\d{4}$/) // yyyy-mm-dd format
        .allow(null, "") // allow empty or null
        .optional(),
    time: Joi.string().optional(),
    tripType: Joi.string().optional(),
    carType: Joi.string().optional(),
    pickupLocation: Joi.string().optional(),
    multipleStop: Joi.array().items(Joi.string()).optional(),
    dropLocation: Joi.string().optional(),
    totalPassenger: Joi.number().integer().optional(),
    totalLuggage: Joi.number().integer().optional(),
    vendorName: Joi.string().optional(),
    vendorPrice: Joi.number().optional(),
    bookingPrice: Joi.number().optional(),
    advancePaid: Joi.number().integer().optional(),
    commission: Joi.number().integer().optional(),
    vehicleId: objectId.optional(),
    vehicleNumber: Joi.string().optional(),
    vehicleName: Joi.string().optional(),
    vehicleType: Joi.string().optional(),
    driverId: objectId.optional(),
    driverNumber: Joi.string().optional(),
    driverName: Joi.string().optional(),
    remarks: Joi.string().optional().allow(""),
});

// Note :- companyId optional in required 
export const getBookingsValidation = Joi.object({
    page: Joi.number().required().min(1),
    limit: Joi.number().required().min(1),
    search: Joi.string().allow(""),
    startDate: Joi.string()
        .pattern(/^\d{4}-\d{2}-\d{2}$/) // yyyy-mm-dd format
        .allow(null, "") // allow empty or null
        .optional(),
    endDate: Joi.string()
        .pattern(/^\d{4}-\d{2}-\d{2}$/) // yyyy-mm-dd format
        .allow(null, "")      // allow empty or null
        .optional(),
    date: Joi.string()
        .pattern(/^\d{2}-\d{2}-\d{4}$/) // yyyy-mm-dd format
        .allow(null, "") // allow empty or null
        .optional(),
});