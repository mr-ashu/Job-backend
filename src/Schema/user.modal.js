const { Schema, model } = require("mongoose");
const userSchema = new Schema({
  name: String,
  email: {
    type: String,
    unique: true
  },
  password: String,
 
  role: {
    type: String,
    enum: ['admin', 'user'],
    required:true,
    default: "user",
  }
});

const UserModel = model("muser", userSchema);

module.exports = UserModel;