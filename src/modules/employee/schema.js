const Joi = require("@hapi/joi");

exports.createEmployee = Joi.object({
  name: Joi.string().required(),
  address: Joi.string().required(),
  gender: Joi.string().valid("L", "P").max(1).required(),
  photo: Joi.string().optional().default(null),
  dateOfBirth: Joi.string().required(),
});

exports.listEmployee = Joi.object({
  keyword: Joi.string().optional(),
  start: Joi.number().optional().default(1).min(1),
  count: Joi.number().optional().default(10).min(1),
});

exports.updateEmployee = Joi.object({
  name: Joi.string().optional(),
  address: Joi.string().optional(),
  gender: Joi.string().valid("L", "P").max(1).optional(),
  photo: Joi.string().optional(),
  dateOfBirth: Joi.string().optional(),
});
