const dotenv = require('dotenv');
dotenv.config()

module.exports = {
    port: process.env.PORT,
    jwtkey: process.env.JWT_SECRET_KEY,
    tokenkey: process.env.TOKEN_HEADER_KEY
}