const express= require('express');
const mongoose =require('mongoose');
const port=3000;
const app=express();


mongoose.connect("mongodb+srv://mohityadav:kJUgEFqwrto0XUYW@realestatec.fupwuxe.mongodb.net/realestate?retryWrites=true&w=majority")
.then(()=> {
    console.log("App is now connected to DB")
}).catch((err)=> {
    console.log(`${err}`);
})

app.use('/api',require('./routes/index.js'))
    

app.listen(port,(err)=>{
    console.log('server is successful',port);
    if(err){
        console.log("errrrrrrrr",err);
    }
})

