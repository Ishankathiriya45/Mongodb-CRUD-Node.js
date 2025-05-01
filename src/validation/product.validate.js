const Joi = require("joi");

const ProductValidate = {
    createProduct: Joi.object().keys({
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

        category: Joi
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

        price: Joi
            .number()
            .required()
            .messages({
                "any.required": "name is mandatory",
            }),

        stock: Joi
            .number()
            .required()
            .messages({
                "any.required": "name is mandatory",
            }),
    })
}

module.exports = {
    ProductValidate,
}