const winston = require('winston');


module.exports = (err, req, res, next) => {
    winston.error(err.message);
    console.log(err.stack);
    res.status(500).send(
        {
            "message":"Something went wrong",
            "status":500,
            "data": []
        }
    );
}