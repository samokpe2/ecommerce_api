const orderService = require('../../services/v1/orders');
const customerService = require('../../services/v1/customers')
const winston  = require('winston')
const payload = require('../../helpers/payload');

async function create(order, customer_id){
    try {
        const {billing_address, total_price, no_of_products, payment_method} = order;
        
        // Validate request body
        if (!(billing_address && total_price && no_of_products && payment_method)) {
            let message = "All fields are required"
            return payload.createPayload(message,400,[])
        }
  
        const res = await orderService.create(customer_id, billing_address, total_price, no_of_products, payment_method);
        if(res){
          winston.info(`Customer with id ${customer_id} created an order at ${new Date()}`)
          let message = "Order Created"
          let data = order
          let status = 201
          return payload.createPayload(message,status,data) 
        }
      } catch (error) {
        winston.error('Error creating order:', error);
      }
}

async function getCustomerOrders(customer_id, page, limit) {
  try {
    // Validate page and limit values
   
    const pageNumber = parseInt(page, 10);
    const limitNumber = parseInt(limit, 10);
    if (isNaN(pageNumber) || isNaN(limitNumber) || pageNumber <= 0 || limitNumber <= 0) {
      let message = "Invalid page or limit value"
      return payload.createPayload(message,400,[])
    }

    const orderData = await orderService.getCustomerOrders(customer_id, pageNumber, limitNumber);
    if(orderData){
      winston.info(`Customer with id ${customer_id} created an order at ${new Date()}`)
      let message = "Orders Retrieved"
      let data = orderData
      let status = 200
      return payload.createPayload(message,status,data) 
    }
  } catch (error) {
    winston.error('Error retrieving customer orders:', error);
  }
}

module.exports = {create, getCustomerOrders}
