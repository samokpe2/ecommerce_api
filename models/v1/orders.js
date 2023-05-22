const winston = require('winston');
const db = require('../../db/sqlite3');
const CURRENT_TIMESTAMP = `${new Date()}`;


async function create(customer_id, billing_address, total_price, no_of_products, payment_method){
    const sql = `INSERT INTO orders (customer_id, billing_address,no_of_products, payment_method,total_price,order_date) VALUES (?,?,?,?,?,?)`;
    
    try {
        await new Promise((resolve, reject) => {
          db.run(sql, [customer_id, billing_address, no_of_products, payment_method, total_price, CURRENT_TIMESTAMP], (err) => {
            if (err) {
              winston.error(err.message);
              reject(err);
            } else {
              resolve();
            }
          });
        });

        return true;
      } catch (error) {

        winston.error('An error occurred:', error);
        return false;
      }
}

async function getCustomerOrders(customer_id, page, limit){
    try {
      const offset = (page - 1) * limit;
      const query = `
        SELECT id, customer_id, order_date, total_price
        FROM orders
        WHERE customer_id = ?
        ORDER BY order_date DESC
        LIMIT ? OFFSET ?
      `;
      const params = [customer_id, limit, offset];
      const rows  = await new Promise((resolve, reject) => {
        db.all(query, params, (err, rows) => {
          if (err) {
            reject(new Error('Failed to retrieve orders: ' + err.message));
          } else {
            resolve(rows);
          }
        });
      });
      console.log(rows);
      return rows;
    } catch (error) {
      throw new Error('Failed to retrieve orders: ' + error.message);
    }
}

async function countCustomerOrders(customer_id) {
  try {
    const query = `
      SELECT COUNT(*) as count
      FROM orders
      WHERE customer_id = ?
    `;
    const params = [customer_id];
    const row_count = await new Promise((resolve, reject) => {
      db.get(query, params, (err, result) => {
        if (err) {
          reject(new Error('Failed to count orders: ' + err.message));
        } else {
          resolve(result.count);
        }
      });
    });

    return row_count;
  } catch (error) {
    throw new Error('Failed to count orders: ' + error.message);
  }
}

module.exports = {create, getCustomerOrders, countCustomerOrders}