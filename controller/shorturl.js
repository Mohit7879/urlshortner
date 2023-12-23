const shortid=require('shortid');
const { errorhandler } = require('../utils/errorhandler');
const Shorturl=require('../model/shorturl.js');


module.exports.createurl=async(req,res,next)=>{
  try {

   // if url is not passed
    if(!req.body.url){
        return next(errorhandler(400,"url not found"))
      }
    
       // used shortid to create a short string
    const sid=shortid(8)
    const miniurl = `${req.protocol}://${req.get('host')}/${sid}`;

     // if shorturl already created 
    const urlRecord =await Shorturl.findOne({originalurl:req.body.url});
 
    if(urlRecord){

        return res.status(200).json(url={
            surl:urlRecord.surl,
            originalurl:req.body.url
        })

    }


       // create short url and save in database
     Shorturl.create({surl:miniurl,originalurl:req.body.url})
        return res.status(200).json(url={
        surl:miniurl,
        originalurl:req.body.url
    })
    
  } catch (err) {
    next(err)
  }
  

    


}