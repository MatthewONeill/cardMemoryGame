//By: Hayden Mirza
//Backend code for running memory card game

//Modules
const express = require('express');
const path = require('path');
let app = express();
const fs = require('fs');

//Serve public files
app.use(express.static('public'));

//Routing
app.get('/',gamePage);

app.post('/getImageNames', (req, res) => {
    fs.readdir(path.join(__dirname, 'public', 'images'), (err, files) => {
        res.send(files);
    })
})

//Routing functions
function gamePage(req,res){
    res.sendFile(path.join(__dirname,'public','cardHtml.html'));
}

//Run server
app.listen(3000);
console.log("Server running on port 3000");