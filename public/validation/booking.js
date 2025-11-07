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
    // customerId: objectId.required(),
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
    tripStartDate: Joi.string().required(),
    tripEndDate: Joi.string().required(),
    time: Joi.string().required(),
    tripType: Joi.string().required(),
    carType: Joi.string().required(),
    pickupLocation: Joi.string().required(),
    dropLocation: Joi.string().required(),
    totalPassenger: Joi.number().integer().required(),
    totalLuggage: Joi.number().integer().required(),
    vendorName: Joi.string().required(),
    vendorPrice: Joi.number().integer().required(),
    bookingPrice: Joi.number().integer().required(),
    advancePaid: Joi.number().integer().required(),
    commission: Joi.number().integer().required(),
    vehicleId: objectId.required(),
    vehicleNumber: Joi.string().required(),
    vehicleName: Joi.string().required(),
    vehicleType: Joi.string().required(),
    driverId: objectId.required(),
    driverNumber: Joi.string().required(),
    driverName: Joi.string().required(),
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
        .pattern(/^\d{4}-\d{2}-\d{2}$/)
        .allow(null, "")
        .optional(),
});