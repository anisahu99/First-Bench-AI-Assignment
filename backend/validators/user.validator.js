const Joi = require('joi');

// Joi schema for validating user input
const updateValidationSchema = Joi.object({
    name: Joi.string()
        .min(3)
        .max(50)
        .optional
        .messages({
            "string.empty": "Name is required.",
            "string.min": "Name must be at least 3 characters long.",
            "string.max": "Name must not exceed 50 characters."
        }),

    email: Joi.string()
        .email()
        .optional
        .messages({
            "string.email": "Invalid email format.",
            "string.empty": "Email is required."
        }),

    password: Joi.string()
        .min(8)
        .pattern(new RegExp('^(?=.*[A-Za-z])(?=.*\\d)[A-Za-z\\d@$!%*?&]{8,}$'))
        .optional
        .messages({
            "string.pattern.base": "Password must be at least 8 characters long and contain at least one letter and one number.",
            "string.empty": "Password is required."
        }),

    phoneNumber: Joi.string()
        .length(10)
        .pattern(/^[0-9]{10}$/)
        .optional
        .messages({
            "string.pattern.base": "Phone number must be a valid 10-digit number.",
            "string.empty": "Phone number is required."
        }),

});


module.exports = { updateValidationSchema };
