const User =  require('../model/user.js')
const bcrypt = require('bcryptjs');
const jwt=require('jsonwebtoken')
const {errorhandler} = require('../utils/errorhandler.js')


module.exports.signup=async (req,res,next)=>{

    try{
       
     const { email,password}=req.body;
      // hashed the password using bcrypt
    const hashedPassword  = await bcrypt.hash(password, 10);


      // create a user
     User.create({
        email,
        password:hashedPassword,
    })
   
    return res.status(201).json('user created successfully');

}catch(err){
  
    next(err)
}

}



module.exports.signin = async (req,res,next)=>{

    const {email,password}=req.body;

    try{

        // find email in database
        const validUser = await User.findOne({email});
        if(!validUser) return next(errorhandler(404,'User not found '));

        // compare password with databse password using bcrypt
        const validPassword = bcrypt.compareSync(password,validUser.password);
        if(!validPassword) return next(errorhandler(401,'Invalid password'))

          // create token using jwt
        const token = jwt.sign({id:validUser._id},process.env.JWT_SECRET)
      

        //storing token in cookie
        res.cookie('accesstoken',token,{httpOnly:true}).status(200).json('signin success')
   
    }catch(err){

       next(err)
     }


}

module.exports.signOut= (req,res)=>{
     
    res.clearCookie('accesstoken');
    res.status(200).json('sign out success');
    return ;

}

