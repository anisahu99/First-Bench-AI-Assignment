const Joi = require('joi');

// Joi schema for validating user input
const updateValidationSchema = Joi.object({
    updateName: Joi.string()
        .min(3)
        .max(50)
        .optional(),

    updateEmail: Joi.string()
        .email()
        .optional(),

    updatePassword: Joi.string()
        .min(8)
        .pattern(new RegExp('^(?=.*[A-Za-z])(?=.*\\d)[A-Za-z\\d@$!%*?&]{8,}$'))
        .optional(),

    updatePhoneNumber: Joi.string()
        .length(10)
        .pattern(/^[0-9]{10}$/)
        .optional()

});


module.exports = { updateValidationSchema };
