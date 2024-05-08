const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const db = "mongodb+srv://dbuser:dbuser@cluster0.0grlm01.mongodb.net/"
    mongoose.Promise = global.Promise;
    mongoose.connect(db, function(err){
        if(err){
            console.error("Error!" + err);
        }
    });

    router.get("/", function(req, res){
        res.send("api works");
    });

const plantSchema = mongoose.Schema({
    name: { type: String, required: true},
    type: { type: String },
    water: { type: String },
    light: { type: String }, 
    imageUrl: { type: String }, 
    group: { type: String }, 
    });

module.exports = mongoose.model("Plant", plantSchema);