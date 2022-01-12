const express = require("express");
const app = express();
const dotenv = require("dotenv");
require("./models/connection");
const port = process.env.PORT || 3000;
const Student = require("./models/studentDataModel");
const Teacher = require("./models/teacherDataModel");
app.use(express.json());
app.use(express.urlencoded({ extended: true }))
//connection check with postman
app.get('/',(req,res)=>{
res.status(200).json({
   "title":"Welcome to Student-API",
   "routes":"There are 5 routes",
   "POST -> /createstudent":{
      "method":"POST",
      "body":"not required",
      "description":"Will create a student"
   },
   "POST -> /createteacher":{
      "method":"POST",
      "body":"not required",
      "description":"Will create a teacher"
   },
   "GET -> /findastudent/q?name=sumon&phone=01832852963":{
      "method":"GET",
      "body":"not required",
      "description":"Will show a student"
   },
   "PATCH -> /updateastudent/12345678912":{
      "method":"PATCH",
      "body":"not required",
      "description":"Will update student field"
   },
   "DELETE -> /deleteastudent/ssumon":{
      "method":"DELETE",
      "body":"not required",
      "description":"Will delete a student from list"
   }
});
});
//post student
app.post("/createstudent",async (req,res)=>{
    const currentStudent = new Student(req.body);
    //console.log(currentStudent);
    //res.send(currentStudent);
    try{
    await currentStudent.save();
    res.send(currentStudent);
}
catch(e){
    res.send(e);
};

})
//post teacher
app.post("/createteacher",async (req,res)=>{
    const currentTeacher = new Teacher(req.body);
    //console.log(currentStudent);
    //res.send(currentStudent);
    try{
    await currentTeacher.save();
    res.send(currentTeacher);
}
catch(e){
    res.send(e);
};

})

//find a student
app.get("/findastudent/:name",async (req,res)=>{
    try {
        const post = await Student.find({
            name: req.query.name,
            phone: req.query.phone,
        });
        if (post) {
            res.status(200).json({
                data: post,
            });
        } else {
            res.status(500).json({
                error: "Note is unavailable!",
            });
        }
    } catch (err) {
        res.status(500).json({
            error: "There was a server side error!",
        });
    }

});
//update a student data
app.patch("/updateastudent/:phone",async (req,res)=>{
    try {
        const myQuery = {
            phone: req.params.phone,
        };
        const post = await Student.findOneAndUpdate(myQuery,{
            $set: {
                name:req.body.name,

            },});
        if (post) {
            res.status(200).json({
                data: post,
            });
        } else {
            res.status(500).json({
                error: "Note is unavailable!",
            });
        }
    } catch (err) {
        res.status(500).json({
            error: "There was a server side error!",
        });
    }

});
//delete a student
app.delete("/deleteastudent/:name",async (req,res)=>{
    try {
        const myQuery = {
            name: req.params.name,
        };
        const post = await Student.deleteOne(myQuery);
        if (post) {
            res.status(200).json({
                data: post,
            });
        } else {
            res.status(500).json({
                error: "Note is unavailable!",
            });
        }
    } catch (err) {
        res.status(500).json({
            error: "There was a server side error!",
        });
    }

});



app.listen(port,()=>{
    console.log(`connection established at port ${port} `);
})