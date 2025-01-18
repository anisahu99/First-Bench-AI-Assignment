const Joi = require('joi');

// Joi schema for validating user input
const registerValidationSchema = Joi.object({
    name: Joi.string()
        .min(3)
        .max(50)
        .required()
        .messages({
            "string.empty": "Name is required.",
            "string.min": "Name must be at least 3 characters long.",
            "string.max": "Name must not exceed 50 characters."
        }),

    email: Joi.string()
        .email()
        .required()
        .messages({
            "string.email": "Invalid email format.",
            "string.empty": "Email is required."
        }),

    password: Joi.string()
        .min(8)
        .pattern(new RegExp('^(?=.*[A-Za-z])(?=.*\\d)[A-Za-z\\d@$!%*?&]{8,}$'))
        .required()
        .messages({
            "string.pattern.base": "Password must be at least 8 characters long and contain at least one letter and one number.",
            "string.empty": "Password is required."
        }),

    phoneNumber: Joi.string()
        .length(10)
        .pattern(/^[0-9]{10}$/)
        .required()
        .messages({
            "string.pattern.base": "Phone number must be a valid 10-digit number.",
            "string.empty": "Phone number is required."
        }),

    role: Joi.string()
        .valid('Admin', 'User')
        .required()
        .messages({
            "any.only": "Role must be either 'Admin' or 'User'.",
            "string.empty": "Role is required."
        })
});
// Joi schema for validating user input
const loginValidationSchema = Joi.object({

    email: Joi.string()
        .email()
        .required()
        .messages({
            "string.email": "Invalid email format.",
            "string.empty": "Email is required."
        }),

    password: Joi.string()
        .min(8)
        .pattern(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*?&]{8,}$/)
        .required()
        .messages({
            "string.pattern.base": "Password must be at least 8 characters long and contain at least one letter and one number.",
            "string.empty": "Password is required."
        }),

    role: Joi.string()
        .valid('Admin', 'User')
        .required()
        .messages({
            "any.only": "Role must be either 'Admin' or 'User'.",
            "string.empty": "Role is required."
        })
});

module.exports = { registerValidationSchema, loginValidationSchema };
