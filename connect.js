const mongoose = require("mongoose");
const mongodb = mongoose.connect("mongodb://localhost:27017").then(()=>{
    console.log("succesfully connected")
}).catch((err)=>{
    console.log(err)
})