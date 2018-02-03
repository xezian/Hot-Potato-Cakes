// let's create an express server here!
const express = require("express");
const app = express();
const PORT = 3000;
// listener for connection 
app.listen(PORT, function(){
    console.log(`App listening on PORT ${PORT}`)
});