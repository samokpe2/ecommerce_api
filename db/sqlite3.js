
const path = require('path')
const sqlite3 = require('sqlite3').verbose();

//using  be inmemory database also 
const db = new sqlite3.Database(':memory:', (err) => {
    if (err) {
        return console.error(err.message);
      }
});

//could also use file/ persistent database
// const db = new sqlite3.Database(path.resolve(__dirname, 'ecommerce.db'),sqlite3.OPEN_READWRITE, (err) => {
//     if (err) {
//         return console.error(err.message);
//       }
// });

        db.run(`
            CREATE TABLE IF NOT EXISTS customers (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                name TEXT,
                email TEXT,
                password TEXT,
                date_time_added TEXT
            );
            `);

            // Create the Orders table
        db.run(`
            CREATE TABLE IF NOT EXISTS orders (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                customer_id INTEGER,
                billing_address TEXT,
                no_of_products INTEGER,
                payment_method TEXT,
                is_fulfilled INTEGER DEFAULT 0,
                total_price REAL,
                currency TEXT DEFAULT naira,
                order_date TEXT,
                FOREIGN KEY (customer_id) REFERENCES customers (id)
            );
        `);



module.exports =  db