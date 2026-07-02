const OpenAI = require("openai");
const Chat = require("../models/Chat");
const { Content } = require("openai/resources/skills/content.js");


const askQuestion = async (req, res) => {
    try {
      const client = new OpenAI({ apiKey: process.env.OPENAI_KEY?.trim(),
        baseURL: "https://openrouter.ai/api/v1"
       });
     const {question} = req.body;
     if(!question){
        return res.status(400).json({
            success:false,
            message:"Question is required"
        });
     }
     const response = await client.chat.completions.create({
        model:"openai/gpt-4o-mini",
        messages:[{
            role:"system",
            content:"You are a helpful teacher for beginner students, Explain the answer in simple Hinglish language with example."
        },
        {
            role:"user",
            content: question
        }
    ]
     });
const answer = response.choices[0].message.content;

//      const response = await client.responses.create({
//         model : "gpt 5.5",
//         input:`You are a helpful teacher for beginner students, Explain the answer in simple Hinglish language with example. Question: ${question}`
//      });

//      const answer = response.output_text;

     const chat = await Chat.create({question, answer});

     res.status(201).json({
        success:true,
        message:"Answer Generated",
        data:chat
     });
  }
   catch (err) {
    console.log("Ask Question error", err);
    res.status(500).json({
      success: false,
      message: "Failed to Answer Question",
    });
  }
};

const getAllChats = async(req,res)=>{
    try{
       const Chats = await Chat.find().sort({ createdAt: -1 });

       res.status(200).json({
        success:true,
        total:Chats.length,
        data:Chats
       });
    }
    catch(err){
        console.log("Unable to Load Chats", err);
        res.status(500).json({
            success:false,
            message:"Unable to Get Chat Logs"
        });
    }
};

const deleteAllChats = async (req,res) => {
    try{
       await Chat.deleteMany();
       res.status(200).json({
        success:true,
        message:"All Chats deleted"
       });
    }
    catch(err){
        console.log("Unable to Delete Chats", err);
        res.status(500).json({
            success:false,
            message:"Unable to Delete Chats"
        });
    }
};

module.exports = {askQuestion,getAllChats,deleteAllChats};