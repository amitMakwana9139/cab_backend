import Joi from "joi";

// Modify bookiing status by driver
export const bookingStatusChangeValidation = Joi.object({
    id: Joi.string().required(),
    status: Joi.number().required().valid(0, 1, 2),  // 0 - pending, 1 - completed, 2 - cancelled,
    reason: Joi.string().optional(),
    driverExpense: Joi.string().optional(),
    driverExpenseRemarks: Joi.string().optional(),
    driverExpensePhotos: Joi.array().items(Joi.string()).optional(),
});


/* Get assign booking of driver */
export const assignBookingsValidation = Joi.object({
    page: Joi.number().required().min(1),
    limit: Joi.number().required().min(1),
    search: Joi.string().allow(""),
    date: Joi.string()
        .pattern(/^\d{2}-\d{2}-\d{4}$/) // yyyy-mm-dd format
        .allow(null, "") // allow empty or null
        .optional(),
});