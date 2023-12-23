const express= require('express');
const mongoose =require('mongoose');
const port=3000;
const app=express();
require('dotenv').config();
const ShortUrl=require('./model/shorturl.js')
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

app.get('/:shortId', async (req, res) => {
    console.log( req.params);
    const { shortId } = req.params;
    const shorturl = `${req.protocol}://${req.get('host')}/${shortId}`;
    console.log(shortId);
    const urlRecord = await ShortUrl.findOne({surl:shorturl});
  
    if (urlRecord) {
      res.redirect(urlRecord.originalurl);
    } else {
      res.status(404).json({ error: 'Short URL not found' });
    }
  });


    

app.listen(port,(err)=>{
    console.log('server is successful',port);
    if(err){
        console.log("errrrrrrrr",err);
    }
})


app.use((err,req,res,next)=>{
    const statusCode=err.statusCode||500;
    const message=err.message||'Interval Server Error';
    console.log(message);
    return res.status(statusCode).json({
        success:false,
        statusCode,
        message,
    })
})




