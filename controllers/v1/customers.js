const customerService = require('../../services/v1/customers')
const payload = require('../../helpers/payload');
const winston = require("winston");

async function create(customer){
    //validate request
    try{
        const {name, email, password} = customer;
        
        if(!(name && email && password)){
            
            let message = "Name, Email and password is required for registration"
            return payload.createPayload(message,400,[])
            
        }
        
        const res = await customerService.create(name, email, password);
        
        if(res){
            console.log("Hiii")
            winston.info(`${customer.email} registered at ${new Date()}`)
            let message = "Customer Created"
            let data = []
            let status = 201
            return payload.createPayload(message,status,data) 
        }
    }catch(err){
        let statusCode = 500;
        if(err.code === 'EMAIL_IN_USE'){
            statusCode = 409
            let message = "Email is already in use"
            return payload.createPayload(message,statusCode,[])
        }
        winston.error(err.message)
        console.log(err.message);
        let message = "An error occured"
        return payload.createPayload(message, statusCode, [])
    }
    
}

async function authenticate(customer){
    try{
        const {email, password} = customer;
        if(!(email && password)){
            let message = "Email and password is required for authentication"
            return payload.createPayload(message,400,[])
        }

        const res = await customerService.authenticate(email,password);
        if(res){
            winston.info(`${customer.email} logged in at ${new Date()}`)
            let message = "Authentication Succesful"
            let data = res
            let status = 200
            return payload.createPayload(message,status,data) 
        }
    }catch(err){
        let statusCode = 500;
        if(err.code === 'EMAIL_NOT_REGISTERED'){
            statusCode = 409
            let message = "Email has not been registered"
            return payload.createPayload(message,statusCode,[])
        }
        if(err.code === "PASSWORD_INCORRECT"){
            statusCode = 401
            let message = "password is incorrect"
            return payload.createPayload(message,statusCode,[])
        }
        winston.error(err.message)
        let message = "An error occured"
        return payload.createPayload(message, statusCode, [])
    }
    
}

module.exports = {create, authenticate}