const Joi = require("joi");
const postZodiacWithLanguageSchema = Joi.object({
  zodiacid: Joi.string().required(),
  name: Joi.string().required(),
  description: Joi.string().required(),
}).required();

const zodiacqueryschema = Joi.object({
  language: Joi.string().min(1).required(),
}).required();

function postZodiacWithLanguageValidator(req, res, next) {
  const { language } = req.query;
  if (!language) res.status(501).send("Query Param 'language' is required");
  console.log("req.body", req.body);
  const { error } = postZodiacWithLanguageSchema.validate(req.body);
  if (error) res.status(501).send(error);
  else next();
}

function getZodiacsWithSymbolsOfLanguageValidator(req, res, next) {
  const { error } = zodiacqueryschema.validate(req.query);
  if (error) res.status(501).send(error);
  else next();
}

function getZodiacWithSymbolsOfLanguageValidator(req, res, next) {
  const { language } = req.query;
  if (!language)
    return res.status(501).send("Query Param 'language' is required");
  const { zodiacid } = req.params;
  if (!zodiacid)
    return res.status(501).send("Query Param 'zodiacid' is required");
  next();
}

module.exports = {
  postZodiacWithLanguageValidator,
  getZodiacsWithSymbolsOfLanguageValidator,
  getZodiacWithSymbolsOfLanguageValidator,
};
