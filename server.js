const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const chatRoutes = require("./routes/chatRoutes");
dotenv.config();
const app = express();
connectDB();
app.use(cors());
app.use(express.json());

app.get("/",(req,res)=>{
    res.send("Student Doubt Solver API is Running");
});

app.use("/api",chatRoutes);

const PORT = process.env.PORT || 5001;

app.listen(PORT, ()=>{
    console.log("Server started at http://localhost:" +PORT);
    // console.log(`Server started 2 at http://localhost:${PORT}`);
});

