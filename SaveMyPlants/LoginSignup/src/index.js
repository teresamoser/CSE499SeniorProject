const express=require("express")
const app=express()
const path=require("path")
const collection=require("./mongodb")

const htmlPath=path.join(__dirname, '/main-index.html')

app.use(express.json())
app.set("view engine","html")
app.set("views", htmlPath)
app.use(express.urlencoded({extended:false}))


app.get("/login.html",(res,req)=>{
    res.render("login")
})

app.get("/signup.html",(res,req)=>{
    res.render("signup")
})

app.post("/signup.html", async(req, res)=>{

    const data={
        name:req.body.name,
        password:req.body.password 
        } 

    await collection.insertMany([data])
    res.render("/main-index.html")    
})

app.post("/login.html", async(req, res)=>{
    try{
       const check=await collection.findOne({name:req.body.name})
            if(check.password===req.body.password){
                res.render("/main-index.html")
            }
            else{
                res.send("wrong password")
            }
    } 
    catch{ 
        res.send("wrong username")

    }
})

app.listen(3000,() =>{
    console.log("port connected");
})