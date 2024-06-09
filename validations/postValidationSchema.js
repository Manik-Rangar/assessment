const Joi = require("joi");

// GetPost Validation Schema
exports.getPostValidation = Joi.object({
    skip: Joi.number(),
    limit: Joi.number(),
    sort: Joi.string(),
    keyword: Joi.string(),
    tag: Joi.string()
});

// CreatePost Validation Schema
exports.createPostValidation = Joi.object({
    title: Joi.string().min(3).max(1000).required(),
    description: Joi.string().required(),
    image: Joi.string(),
    tags:Joi.array().items(Joi.string())
});



