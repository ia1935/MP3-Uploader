const express = require('express');
const app = express();

const mp3connect = require('./databaseconn')



app.get('/',(req,res) =>{
    console.log("Home Page!");
    res.send("Home Page");
});

app.listen(3000);