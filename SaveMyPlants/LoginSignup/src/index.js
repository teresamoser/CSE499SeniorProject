const express = require("express")
const path = require("path")
const app = express()

const loginsignups = require("./mongodb")
const port = process.env.PORT || 3000
app.use(express.json())

app.use(express.urlencoded({ extended: false}));

const htmlPath = path.join(__dirname, '/main-index.html')
//const publicPath = path.join(_dirname, '../public')
//console.log(publicPath)

app.set("view engine","html")
app.set("views", htmlPath)
//app.use(express.static(publicPath))

// Signup/ Login code
    app.get('/signup',(req, res)=>{
        res.render('signup')
    })

    app.get('/', (req, res) => {
        res.render('login')
    })

    app.post('/signup', async(req, res)=>{

        const data = {
            name: req.body.name,
            password: req.body.password 
            }  

        const checking = await loginsignups.findOne({ name: req.body.name })

        try{
        if (checking.name === req.body.name && checking.password === req.body.password ) {
                    res.send("user details already exists")
            }
            else{
                await loginsignups.insertMany([data])
            }
        } 
        catch{ 
            res.send("wrong inputs")
        }

        res.status(201).render("home", {
            naming: req.body.name
        })
    })


    app.post('/login', async (req, res) =>{

        try{
            const check = await loginsignups.findOne({ name: req.body.name })
            
            if(check.password === req.body.password) {
                res.status(201).render("home", { naming: `${req.body.password}+${req.body.name}`
                })
            }

            else{
                res.send("incorrect password")
            }
        }

        catch (e) {
            res.send("wrong details")
        }
    })


app.listen(port, () =>{
    console.log('port connected');
})