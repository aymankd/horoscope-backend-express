var express = require("express");
var router = express.Router();
const {
  AddZodiac,
  getZodiacs,
  getZodiacWithSymbolsOfLanguage,
} = require("../../Modules/index");
const {
  postZodiacWithLanguageValidator,
  getZodiacWithSymbolsOfLanguageValidator,
} = require("./validation");

/* Get Base zodiacs */
router.get("/", function (_, res) {
  getZodiacs()
    .then((zodiacs) => res.status(200).json(zodiacs))
    .catch((err) => res.status(err.code || 500).send(err));
});
/* Post zodiacs for language. */
router.post("/", postZodiacWithLanguageValidator, function (req, res) {
  AddZodiac(req.query.language, req.body)
    .then((comment) => res.status(200).json(comment))
    .catch((err) => res.status(err.code || 500).send(err));
});
/* Get zodiacs with Signs */
router.get(
  "/signDetails",
  getZodiacWithSymbolsOfLanguageValidator,
  function (req, res) {
    getZodiacWithSymbolsOfLanguage(req.query.language)
      .then((zodiacs) => res.status(200).json(zodiacs))
      .catch((err) => res.status(err.code || 500).send(err));
  }
);

module.exports = router;
