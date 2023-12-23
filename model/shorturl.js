const mongoose = require('mongoose');

const shorturl= new mongoose.Schema({
    
    surl:{
        type : String,
        required:true,
        unique:true,
      
 },

 originalurl:{
    type : String,
    required:true,
    unique:true,
    
},


    
})


module.exports =mongoose.model('Shorturl',shorturl);