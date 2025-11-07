import Joi from "joi";

/* Booking summary details validation for setting */
export const bookingSummaryValidation = Joi.object({
    page: Joi.number().min(1).required(),
    limit: Joi.number().min(1).required(),
    startDate: Joi.string()
        .pattern(/^\d{4}-\d{2}-\d{2}$/)       // yyyy-mm-dd
        .allow(null, "")                      // allow null or empty string
        .optional(),

    endDate: Joi.string()
        .pattern(/^\d{4}-\d{2}-\d{2}$/)
        .allow(null, "")
        .optional(),
});

