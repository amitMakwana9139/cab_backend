import Joi from "joi";

// Modify bookiing status by driver
export const bookingStatusChangeValidation = Joi.object({
    id: Joi.string().required(),
    status: Joi.number().required().valid(0, 1, 2),  // 0 - pending, 1 - completed, 2 - cancelled,
    reason: Joi.string().optional()
});
