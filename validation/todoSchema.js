const Joi = require("joi");
const createSchema = Joi.object().keys({
  heading: Joi.string().required(),
  note: Joi.string(),
});
const updateSchema = Joi.object().keys({
  heading: Joi.string(),
  note: Joi.string(),
  id: Joi.string().required(),
});
const getSchema = Joi.object().keys({
  page: Joi.number(),
  limit: Joi.number(),
  q: Joi.string(),
});
const getOneSchema = Joi.object().keys({
  id: Joi.string().required(),
});
const deleteSchema = Joi.object().keys({
  id: Joi.string().required(),
});
module.exports = {
  createSchema,
  getSchema,
  getOneSchema,
  updateSchema,
  deleteSchema,
};
