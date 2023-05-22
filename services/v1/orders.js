const orderModel = require('../../models/v1/orders');

async function create(customer_id, billing_address, total_price, no_of_products, payment_method){
    try {
        // Create the order
        const createdOrder = await orderModel.create(customer_id, billing_address, total_price, no_of_products, payment_method);
        return createdOrder;
    } catch (error) {
      throw new Error('Failed to create order: ' + error.message);
    }
}

async function getCustomerOrders(customer_id, page, limit){
    try {

      const orders = await orderModel.getCustomerOrders(customer_id, page, limit);
      const totalCount = await orderModel.countCustomerOrders(customer_id);
      const totalPages = Math.ceil(totalCount / limit);
      return { "order": orders, "totalcount": totalCount,  "totalpages": totalPages };

    } catch (error) {
      throw new Error('Failed to get customer orders: ' + error.message);
    }
}

module.exports = {create, getCustomerOrders}
