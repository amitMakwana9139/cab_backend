import Joi from 'joi';
import mongoose from 'mongoose';

// Custom validation for ObjectId
const objectId = Joi.string().custom((value, helpers) => {
    if (!mongoose.Types.ObjectId.isValid(value)) {
        return helpers.message('Invalid ObjectId');
    }
    return value;
});

/* Add vehicle validation */
export const addVehicleValidation = Joi.object({
    // vehicleId: objectId.required(),
    vehicleImage: Joi.array().optional(),
    vehicleName: Joi.string().required(),
    vehicleNumber: Joi.string().required(),
    vehicleType: Joi.string().required(),
    insuranceExpiryDate: Joi.string()
        .pattern(/^\d{4}-\d{2}-\d{2}$/)       // yyyy-mm-dd
        .allow(null, "")                      // allow null or empty string
        .required(),
    fitnessExpiryDate: Joi.string()
        .pattern(/^\d{4}-\d{2}-\d{2}$/)       // yyyy-mm-dd
        .allow(null, "")                      // allow null or empty string
        .required(),
    serviceStartKms: Joi.number().required(),
});

/* Create booking validation */
export const editVehicleValidation = Joi.object({
    // vehicleImage:,
    // vehicleId: objectId.required(),
    id: objectId.required(),
    vehicleImage: Joi.array().optional(),
    vehicleName: Joi.string().optional(),
    vehicleNumber: Joi.string().optional(),
    vehicleType: Joi.string().optional(),
    insuranceExpiryDate: Joi.string()
        .pattern(/^\d{4}-\d{2}-\d{2}$/)       // yyyy-mm-dd
        .allow(null, "")                      // allow null or empty string
        .optional(),
    fitnessExpiryDate: Joi.string()
        .pattern(/^\d{4}-\d{2}-\d{2}$/)       // yyyy-mm-dd
        .allow(null, "")                      // allow null or empty string
        .optional(),
    serviceStartKms: Joi.number().optional(),
});