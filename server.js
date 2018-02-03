// let's create an express server here!
const path = require("path");
const express = require("express");
const app = express();
const PORT = 3000;


// reservation variables
// =============================================================
let reservation = [];
let waitlist = [];


// Routes
// =============================================================

// Basic route that sends the user first to the AJAX Page
app.get("/", function(req, res) {
  res.sendFile(path.join(__dirname, "index.html"));
});

app.get("/view", function(req, res) {
  res.sendFile(path.join(__dirname, "view.html"));
});

app.get("/add", function(req, res) {
  res.sendFile(path.join(__dirname, "add.html"));
});













// listener for connection 
app.listen(PORT, function(){
    console.log(`App listening on PORT ${PORT}`)
});