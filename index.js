const express = require("express");
const cors = require("cors");
const logger = require("morgan");
const app = express();
const routes = require("./routes");
app.use(cors());
app.use(logger("combined"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api", routes);
var listener = app.listen(parseInt(process.env.PORT) || 4444, () => {
  console.log(
    `check out the magic at: http://localhost:${listener.address().port}`
  );
});
