const { errorhandler } = require("./errorhandler");
const jwt =require('jsonwebtoken');



module.exports.verifyToken=(req,res,next)=>{
    try{

   
   const token =req.cookies.accesstoken
console.log("token",token);


if(!token){
    return next(errorhandler(401,'unauthorised'))
}else{
    try {

        // verifying token and decoding to get payload
        const payload=  jwt.verify(token,process.env.JWT_SECRET)
        console.log("payload",payload);
        next()
        
    } catch (error) {
        next(error)
      
    }
 
   
    
}
    }catch(err){
      next(err)
    }
}