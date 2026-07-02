const mongoose = require("mongoose");

const connectDB = async(req,res)=>{
    try{
      await mongoose.connect(process.env.MONGODB_URL);
      console.log("MONGODB CONNECTED");
    }
    catch(err){
        console.log("Unable to connect", err);
    }
};

module.exports = connectDB;