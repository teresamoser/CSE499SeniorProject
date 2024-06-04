const mongoose = require("mongoose")

mongoose.connect("mongodb+srv://dbuser:dbuser@cluster0.0grlm01.mongodb.net/")
.then(()=>{
    console.log("mongoose connected");
})
.catch((e)=>{
    console.log('failed');
})

const LogInSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
})

const collection = new mongoose.model('loginsignups', LogInSchema)

module.exports = collection
