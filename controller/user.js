const User =  require('../model/user.js')
const bcrypt = require('bcryptjs');
const jwt=require('jsonwebtoken')


module.exports.signup=async (req,res)=>{

    try{
       
     const { email,password}=req.body;
   
    const hashedPassword  = await bcrypt.hash(password, 10);// we can give salt value to 12 to make it safer
     User.create({
        email,
        password:hashedPassword,
    })
   
    return res.status(201).json('user created successfully');

}catch(err){
  
    console.log(err);
}

}

module.exports.signin = async (req,res)=>{

    const {email,password}=req.body;

    try{
        const validUser = await User.findOne({email});
        if(!validUser) return 
        const validPassword = bcrypt.compareSync(password,validUser.password);
        if(!validPassword) return 
        const token = jwt.sign({id:validUser._id},process.env.JWT_SECRET)
        const {password:pass,...rest}=validUser._doc
    res.cookie('access_token',token,{httpOnly:true}).status(200).json(rest)
    console.log(rest);
   
    }catch(err){

         console.log(err);
     }


}

module.exports.signOut= (req,res)=>{
     
    res.clearCookie('access_token');
    res.status(200).json('sign out success');
    return ;

}

