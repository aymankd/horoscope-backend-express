const express = require("express");
const router = express.Router();
const zodiacrouter = require("./zodiacs");
router.use("/zodiac", zodiacrouter);
module.exports = router;
