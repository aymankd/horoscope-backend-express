const express = require("express");
const router = express.Router();
const zodiacrouter = require("./zodiacs");
const languagerouter = require("./languages");
const symbolrouter = require("./symbols");
router.use("/zodiac", zodiacrouter);
router.use("/language", languagerouter);
router.use("/symbol", symbolrouter);
module.exports = router;
