const express= require('express');
const mongoose =require('mongoose');
const port=3000;
const app=express();
require('dotenv').config();
console.log(process.env.MONGO);
mongoose.connect(process.env.MONGO)
.then(()=> {
    console.log("App is now connected to DB")
}).catch((err)=> {
    console.log(`${err}`);
})
app.use(express.urlencoded({
    extended:true,
}));
app.use('/api',require('./routes/index.js'))
    

app.listen(port,(err)=>{
    console.log('server is successful',port);
    if(err){
        console.log("errrrrrrrr",err);
    }
})




