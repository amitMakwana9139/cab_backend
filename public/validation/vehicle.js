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
    vehicleType: Joi.string().required()
});

/* Create booking validation */
export const editVehicleValidation = Joi.object({
    // vehicleImage:,
    // vehicleId: objectId.required(),
    id: objectId.required(),
    vehicleImage: Joi.array().optional(),
    vehicleName: Joi.string().optional(),
    vehicleNumber: Joi.string().optional(),
    vehicleType: Joi.string().optional()
});