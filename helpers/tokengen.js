
const jwt = require('jsonwebtoken')
const config = require("../config/index");

function generate(data){
    let jwtSecretKey = config.jwtkey;
    
    const token = jwt.sign(data, jwtSecretKey, { expiresIn: '1d' });
  
    return token;
}

module.exports = {generate};