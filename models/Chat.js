const mongoose  = require("mongoose");
const { type } = require("node:os");

const chatSchema = new mongoose.Schema({
    question:{
        type:String,
        required: true
    },
    answer:{
        type:String,
        required: true
    }
},{
    timestamps:true
});

module.exports = mongoose.model("Chat",chatSchema);