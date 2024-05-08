// const app = require("../backend/app");
const debug = require("debug")("node-angular");
const http = require("http");
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const Plant = require("./models/plant");

const app = express();

mongoose.connect("mongodb+srv://dbuser:dbuser@cluster0.0grlm01.mongodb.net/")
        .then(() => {
            console.log("Connected to database!")
        })
        .catch(() => {
            console.log("Connection failed!")
        });


app.use(bodyParser.json());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers","Origin, X-Requested-With, Content-Type, Accept");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE, OPTIONS");
  next();
});

app.post("api/plants",(req, res, next) => {
  const plant = new Plant({
    name: req.body.name,
    type: req.body.type,
    water: req.body.water,
    light: req.body.light,
    imageUrl: req.body.imageUrl,
    group: req.body.group
  });
  plant.save();
  res.status(201).json({
    message: "Plant added successfully"
  });
});

app.get("/api/plants", (req, res, next) => {
  Plant.find().then(documents => {
      res.status(200).json({
        message: "Plants fetched successfully!",
      plants: documents
        });
    });
});

const normalizePort = val => {
  var port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
};

const onError = error => {
  if (error.syscall !== "listen") {
    throw error;
  }
  const bind = typeof port === "string" ? "pipe " + port : "port " + port;
  switch (error.code) {
    case "EACCES":
      console.error(bind + " requires elevated privileges");
      process.exit(1);
      break;
    case "EADDRINUSE":
      console.error(bind + " is already in use");
      process.exit(1);
      break;
    default:
      throw error;
  }
};

const onListening = () => {
  const addr = server.address();
  const bind = typeof port === "string" ? "pipe " + port : "port " + port;
  debug("Listening on " + bind);
};

const port = normalizePort(process.env.PORT || "8080");
app.set("port", port);

const server = http.createServer(app);
server.on("error", onError);
server.on("listening", onListening);
server.listen(port);

module.exports = app;