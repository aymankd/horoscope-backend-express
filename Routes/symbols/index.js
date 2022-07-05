var express = require("express");
var router = express.Router();
const {
  getSymbolOfZodiacByLanguage,
  addSymbol,
} = require("../../Modules/index");
const {
  getZodiacSymbolValidator,
  postSymbolValidator,
} = require("./validation");
/* Get symbols of a zodiac */
router.get(
  "/:zodiacid/:language",
  getZodiacSymbolValidator,
  function (req, res) {
    getSymbolOfZodiacByLanguage(req.params.zodiacid, req.params.language)
      .then((symbols) => res.status(200).json(symbols))
      .catch((err) => res.status(err.code || 500).send(err));
  }
);
/* Post zodiac symbol  */
router.post("/", postSymbolValidator, function (req, res) {
  addSymbol(req.query.language, req.body)
    .then((symbol) => res.status(200).json(symbol))
    .catch((err) => res.status(err.code || 500).send(err));
});

module.exports = router;
