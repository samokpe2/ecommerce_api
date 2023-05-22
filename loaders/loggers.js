require('express-async-errors');

const winston = require('winston');

module.exports = () => {
    winston.add(new winston.transports.File({filename: 'logs/report.log'}));
    winston.exceptions.handle(
        new winston.transports.File({filename: 'logs/expections.log'}),
        new winston.transports.Console({colorize: true, prettyPrint: true})
    );
}