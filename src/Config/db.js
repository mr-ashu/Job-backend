// const mongoose = require("mongoose");

// const connect = async () => {
//     return mongoose.connect(process.env.DB_URL)

// }

// module.exports = connect


const mongoose = require("mongoose");
mongoose.set("strictQuery", false);
const Connect =  () => {
  
    try {
        
        mongoose.connect(process.env.DB_URL, { useNewUrlParser: true });
        console.log("Database connected  successfully");
        
    } catch (err) {
        console.log("Error while connecting with the Database", err)
    }

     return mongoose.connect(process.env.DB_URL)
}

module.exports = Connect;