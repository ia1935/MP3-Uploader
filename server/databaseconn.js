const mysql = require('mysql');

const connection = mysql.createConnection({
    host:'localhost',
    user:'root',
    password: 'password',
    database:'mp3database'
});


connection.connect((err) =>
{
    if (err)
    {
        console.error("Error connecting to DB",err.message)
        return;
    }
    console.log("Connected to SQL server");

});

// // Create database using these 2 lines:
// const createDatabaseQuery = 'create database if not exists mp3database';

// connection.query(createDatabaseQuery);

// //creating song info table
// //Needs:
// //unique id, song title, artist,
// const createSongInfo = `create table if not exists songInfo (id int AUTO_INCREMENT PRIMARY KEY, song_title text, artist text, filename text);`;
// connection.query(createSongInfo);

connection.end();
module.exports= connection;
    
