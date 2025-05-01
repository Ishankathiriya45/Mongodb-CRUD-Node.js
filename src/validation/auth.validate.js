const Joi = require("joi");

const AuthValidate = {
    register: Joi.object().keys({
        name: Joi
            .string()
            .min(2)
            .max(128)
            .required()
            .messages({
                "any.required": "name is mandatory",
                "string.empty": "name cannot be empty",
                "string.min": "Name must be at least {#limit} characters long.",
                "string.max": "Name must be less than or equal to {#limit} characters long.",
            }),

        email: Joi
            .string()
            .email()
            .required()
            .messages({
                "string.email": "please provide a valid email address",
            }),

        password: Joi
            .string()
            .min(6)
            .max(128)
            .required()
            .regex(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*?&]{6,128}$/)
            .messages({
                "any.required": "email is mandatory",
                "string.min": "Password must be at least {#limit} characters long.",
                "string.max": "Password must be less than or equal to {#limit} characters long.",
                'string.pattern.base': 'Password must contain at least one letter and one number.',
            }),
    }),

    login: Joi.object().keys({
        email: Joi
            .string()
            .email()
            .required()
            .messages({
                "string.email": "please provide a valid email address",
            }),

        password: Joi
            .string()
            .min(6)
            .max(128)
            .required()
            .regex(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*?&]{6,128}$/)
            .messages({
                "any.required": "email is mandatory",
                "string.min": "Password must be at least {#limit} characters long.",
                "string.max": "Password must be less than or equal to {#limit} characters long.",
                'string.pattern.base': 'Password must contain at least one letter and one number.',
            }),
    })
}

module.exports = {
    AuthValidate,
}