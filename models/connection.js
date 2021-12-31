const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();
mongoose.connect(process.env.DB).then(()=>{
    console.log("connection successful");
}).catch((e)=>{
    console.log("not conneect");
})