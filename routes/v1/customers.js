const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth')
const customerController = require('../../controllers/v1/customers');
const orderController = require('../../controllers/v1/orders')



router.post('/', async (request, response) => {
    const res = await customerController.create(request.body)
    response.status(res.status).send(res);
})



router.post('/auth', async (request, response) => {
    const res = await customerController.authenticate(request.body)
    response.status(res.status).send(res);
})

router.post('/:id/order', auth,  async (request, response) => {
    const res = await orderController.create(request.body, request.params.id)
    response.status(res.status).send(res);
})

router.get('/:id/order', auth,  async (request, response) => {
    const res = await orderController.getCustomerOrders(request.params.id, request.query.page, 5)
    response.status(res.status).send(res);
})








module.exports = router;