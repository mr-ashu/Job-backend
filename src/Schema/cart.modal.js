const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema({
   
    
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"realuser",
        required:true,
    
       },
    data:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"rsdata",
        required:true,
    
       },
    quantity:{
        type:Number,
      
        min:1,
       },
  
},
{ versionKey: false })

const  Cart = mongoose.model("realcart", cartSchema);

module.exports = Cart;