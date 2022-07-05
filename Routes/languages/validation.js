const Joi = require("joi");
const langagueschema = Joi.object({
  id: Joi.string().required(),
  name: Joi.string().required(),
}).required();

function postLanguageValidator(req, res, next) {
  const { error } = langagueschema.validate(req.body);
  if (error) res.status(501).send(error);
  else next();
}

module.exports = {
  postLanguageValidator,
};
