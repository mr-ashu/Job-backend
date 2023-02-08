const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    type:{
       type:String,
       
    },
    price:{
        type:String
    },
    description:{
        type:String
    },
    address:{
        type:String
    },
    email:{
        type:String
    }
 
 
 
},
{ versionKey: false })

const Product = mongoose.model("rsdata", productSchema);

module.exports = Product;