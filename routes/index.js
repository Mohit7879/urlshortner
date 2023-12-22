const router=require('express').Router();
router.use('/urlshortner',require('./urlshortner.js'))
router.use('/user',require('./user.js'))

module.exports=router;