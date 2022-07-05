const zodiacActions = require("./zodiacActions");
const symbolActions = require("./symbolActions");
const languageActions = require("./languageActions");
module.exports = {
  ...zodiacActions,
  ...symbolActions,
  ...languageActions,
};
