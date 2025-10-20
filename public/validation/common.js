import Joi from "joi";

// Note :- companyId optional in required 
export const paginationValidation = Joi.object({
    page: Joi.number().required().min(1),
    limit: Joi.number().required().min(1),
    search: Joi.string().allow("")
});

// Common validation of id
export const commonIdValidation = Joi.object({
    id: Joi.string().required(),
});