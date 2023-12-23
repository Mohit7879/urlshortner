const router=require('express').Router();
const {createurl}=require('../controller/shorturl.js')
const {verifyToken }=require('../utils/verifytoken.js')


router.post('/createurl',verifyToken,createurl);




module.exports=router;