//By: Hayden Mirza
//Backend code for running memory card game

//Modules
const express = require('express');
const path = require('path');
let app = express();

//Serve public files
app.use(express.static('public'));

//Routing
app.get('/',gamePage);

//Routing functions
function gamePage(req,res){
    res.sendFile(path.join(__dirname,'public','cardHtml.html'));
}

//Run server
app.listen(3000);
console.log("Server running on port 3000");