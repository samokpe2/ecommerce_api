const winston = require('winston');
const db = require('../../db/sqlite3');
const CURRENT_TIMESTAMP = `${new Date()}`;



async function findByEmail(email){
    const sql = "SELECT * from customers where email = ?"
    try {
        const row = await new Promise((resolve, reject) => {
          db.get(sql, [email], (err, row) => {
            if (err) {
              winston.error(err.message);
              reject(err);
            } else {
              resolve(row);
            }
          });
        });
        return row;
      } catch (error) {
        winston.error('An error occurred:', error);
      }
}

async function create(name, email, passwordhash){
    const sql = `INSERT INTO customers (name, email, password, date_time_added) VALUES (?,?,?,?)`;
    
    try {
        await new Promise((resolve, reject) => {
          db.run(sql, [name, email, passwordhash, CURRENT_TIMESTAMP], (err) => {
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


module.exports = {create, findByEmail}