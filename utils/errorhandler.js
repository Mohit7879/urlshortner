module.exports.errorhandler=(statusCode,message)=>{
    // craete error object and setting error status and message and return error
    const error=new Error();
     error.statusCode=statusCode;
     error.message=message;
    
     return error;
 }