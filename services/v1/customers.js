const customerModel = require('../../models/v1/customers')
const tokengen = require('../../helpers/tokengen');
const _ = require('lodash');
const bcrypt = require('bcrypt')
const winston  =require('winston')

async function create(name, email, password){

       
    const passwordhash = await bcrypt.hash(password, 10);
    
    const existingCustomer = await customerModel.findByEmail(email);
    if (existingCustomer) {
        const error = new Error('Email is already in use');
        error.code = 'EMAIL_IN_USE';
        throw error;
    }
    
    const createdCustomer = await customerModel.create(name, email, passwordhash);
    
    return createdCustomer;
     
}

async function authenticate(email,password){

    // Find the customer by email
    const customer = await customerModel.findByEmail(email);
    if (!customer) {
        const error = new Error('Email is not registered');
        error.code = 'EMAIL_NOT_REGISTERED';
        throw error;
    }

    // Compare the password using bcrypt
    const passwordMatch = await bcrypt.compare(password, customer.password);
    if (!passwordMatch) {
        const error = new Error('Incorrect password');
        error.code = 'PASSWORD_INCORRECT';
        throw error;
    }
    
    winston.info(`${email} logged in at ${new Date()}`)
    
    let customerData = _.pick(customer,['id','email','name'])
    let token = tokengen.generate(customerData)
    let data = {'token':token}
    // Authentication successful
    return data;

    
}




module.exports = {create, authenticate}