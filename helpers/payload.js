
async function createPayload(message, status, data){
    return  {
                "message":message,
                "status":status,
                "data":data
            }
} 



module.exports = {createPayload};