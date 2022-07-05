var express = require("express");
var router = express.Router();
const {
  getLanguages,
  getLanguage,
  addLanguage,
} = require("../../Modules/index");
const { postLanguageValidator } = require("./validation");
/* Get all languages */
router.get("/", function (_, res) {
  getLanguages()
    .then((languages) => res.status(200).json(languages))
    .catch((err) => res.status(err.code || 500).send(err));
});
/* Get language by id */
router.get("/:lang", function (req, res) {
  const { lang } = req.params;
  getLanguage(lang)
    .then((language) => res.status(200).json(language))
    .catch((err) => res.status(err.code || 500).send(err));
});
/* Post language */
router.post("/", postLanguageValidator, function (req, res) {
  addLanguage(req.body)
    .then((language) => res.status(200).json(language))
    .catch((err) => res.status(err.code || 500).send(err));
});

module.exports = router;
