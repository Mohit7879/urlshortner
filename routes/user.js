const { signup, signin, signOut } = require('../controller/user.js');


const router=require('express').Router();

router.post('/signup',signup);
router.post('/signin',signin);
router.get('/signout',signOut);


module.exports=router;