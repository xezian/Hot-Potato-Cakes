// built in dependencies
const path = require("path");

// npm dependencies 
const express = require("express");
const bodyParser = require("body-parser");

// sets up express app
// =============================================================
const app = express();
const PORT = process.env.PORT || 3000;

// sets up express app to handle data parsing
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// reservation variables with dummy data
// =============================================================
let reservations = [{
    name: "Peter FN",
    phoneNum: "(520)111-2222",
    email: "peterfn@someplace.net",
    uniqueID: "peterrabbit"
}];
let waitlist = [{
    name: "Jan Jorgen",
    phoneNum: "(520)333-4444",
    email: "janjorg@someplace.net",
    uniqueID: "janjorg"
}];

// Routes
// =============================================================

// Basic routes to send users to the various pages:
app.get("/", function(req, res) {
  res.sendFile(path.join(__dirname, "index.html"));
});

app.get("/view", function(req, res) {
  res.sendFile(path.join(__dirname, "view.html"));
});

app.get("/add", function(req, res) {
  res.sendFile(path.join(__dirname, "add.html"));
});

// more complex routes to handle giving JSON info to users
app.get("/api/reservations", function(req, res){
    res.json(reservations);
});
app.get("/api/waitlist", function(req, res){
    res.json(waitlist);
});

// Create Reservation - takes in JSON input
app.post("/api/new", function(req, res) {
    // req.body hosts is equal to the JSON post sent from the user
    // This works because of our body-parser middleware
    let newReservation = req.body;
    // show in console
    console.log(newReservation);
    // push to the reservations array
    if(reservations.length > 5){
        waitlist.push(newReservation);
    }else{
        reservations.push(newReservation);
    }
    res.json(newReservation);
});

// Remove reservation and move next person on waitlist to reservations
app.post("/api/remove", function(req, res) {
    let resToRemove = req.body;
    let id = resToRemove.uniqueID;
    console.log(resToRemove);
    console.log(id);
    for(let i = 0; i < reservations.length; i++){
        if(reservations[i].uniqueID===id){
            reservations.slice(i, i + 1);
            let waitNoMore = waitlist.shift();
            reservations.push(waitNoMore);
        }else{
            console.log("I couldn't find that reservation!");
        }
    }
});

// listener for connection 
app.listen(PORT, function(){
    console.log(`App listening on PORT ${PORT}`)
});