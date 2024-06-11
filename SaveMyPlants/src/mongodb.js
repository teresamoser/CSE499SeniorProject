const mongoose=require('mongoose')

mongoose.connect("mongodb+srv://dbuser:dbuser@cluster0.0grlm01.mongodb.net/LoginSignup")
.then(()=>{
    console.log("MongoDB Connected Succesfully!");
})
.catch(()=>{
    console.log("Failed to Connect!")
})

const LogInSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true
    }
})


const collection = new mongoose.model("LogInCollections",LogInSchema)

module.exports = collection