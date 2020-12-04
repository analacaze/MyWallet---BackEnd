const Joi = require('joi');

const signIn = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(6).max(10).required(),
});

const signUp = Joi.object({
    name: Joi.string().alphanum().min(3).max(20).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).max(10).required(),
    passwordConfirmation: Joi.valid(Joi.ref('password')).required()
});

module.exports = {signIn, signUp}; 