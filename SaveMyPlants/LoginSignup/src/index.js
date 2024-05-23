const express=require("express")
const app=express()
const path=require("path")
const hbs=require("hbs")
const collection=require("./mongodb")

const templatePath=path.join(__dirname, '../templates')

app.use(express.json())
app.set("view engine","hbs")
app.set("views", templatePath)

app.get("/login",(res,req)=>{
    res.render("login")
})

app.get("/signup",(res,req)=>{
    res.render("signup")
})

app.post("/signup", async(req, res)=>{

const data={
    name:req.body.name,
    password:req.body.password 
} 

await collection.insertMany([data])

res.render("home")
    
})

app.listen(3000,() =>{
    console.log("port connected");
})