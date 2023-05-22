const express = require('express')
const winston = require("winston");
const config = require("./config/index");

const app = express();

require('./loaders/loggers')();
require('./loaders/routes')(app);
require('./loaders/prod')(app);

app.listen(config.port, () => winston.info(`Listening on port ${config.port}...`));

module.exports = app