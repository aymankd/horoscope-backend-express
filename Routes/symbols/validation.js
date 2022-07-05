const Joi = require("joi");
const getZodiacSymbolSchema = Joi.object({
  zodiacid: Joi.string().required(),
  language: Joi.string().required(),
}).required();

const postSymbolSchema = Joi.object({
  zodiacid: Joi.string().required(),
  name: Joi.string().required(),
  value: Joi.string().required(),
}).required();

function getZodiacSymbolValidator(req, res, next) {
  const { error } = getZodiacSymbolSchema.validate(req.params);
  if (error) res.status(501).send(error);
  else next();
}

function postSymbolValidator(req, res, next) {
  if (!req.query.language)
    res.status(501).send("Query param 'language' is required");
  const { error } = postSymbolSchema.validate(req.body);
  if (error) res.status(501).send(error);
  else next();
}

module.exports = {
  getZodiacSymbolValidator,
  postSymbolValidator,
};
