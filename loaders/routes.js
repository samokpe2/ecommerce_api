const express = require('express');
const customer = require('../routes/v1/customers');
const error = require('../middleware/error');

module.exports = (app) => {
    app.use(express.json());
    app.use('/api/v1/customer', customer);
    app.use(error);
    app.use((req, res, next) => {
        console.log(req.originalUrl)
        res.status(404).send(
            {
                "message":"Not Found",
                "status":404,
            }
        )
    })
    
}