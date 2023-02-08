const { Schema, model } = require("mongoose");
const cSchema = new Schema({
 
  email: {
    type: String,
   
  },
 date:{
    type: String,
   
 }
 
 
});

const CModel = model("contactlist", cSchema);

module.exports = CModel;