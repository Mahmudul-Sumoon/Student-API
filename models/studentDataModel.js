const mongoose = require("mongoose");
const validator = require("validator");
const StudentSchema = new mongoose.Schema(
    {
        name:{
            type : String,
            require : true,
            minlength : 3
        },
        email:{
            type : String,
            require : true,
            unique : [true,"Match with another email"],
            validate(value){
               if(!validator.isEmail(value)){
                    throw new Error("Enter a valid email")

                }
            },
        },
        phone:{
            type : String,
            require : true,
            minlength : 11,
            validate(value){
                if(!validator.isMobilePhone(value)){
                    throw new Error("Enter a valid email");

                }
            },
        },
        address:{
            type : String,
            require : true,
        },
    }
)

const student = new mongoose.model('student',StudentSchema);
module.exports = student;