const express=require("express")
const app=express()
const path=require("path")
const hbs=require("hbs")

const templatePath=path.join(__dirname, '../templates')

app.use(express.json())
app.set("view engine","hbs")
app.set("views", templatePath)

app.get("/",(res,req)=>{
    res.render("login")
})

app.get("/signup",(res,req)=>{
    res.render("signup")
})

app.listen(3000,() =>{
    console.log("port connected");
})