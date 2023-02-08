const { Schema, model } = require("mongoose");
const userSchema = new Schema({
  name: String,
  email: {
    type: String,
    unique: true
  },
  mob:Number,
  password: String,
 
 
});

const UserModel = model("realuser", userSchema);

module.exports = UserModel;